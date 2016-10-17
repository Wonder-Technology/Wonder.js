var instanceTool = (function(){
    function _sliceArray(array, start, end){
        var result = [];

        for(var i = start; i < end; i++){
            result.push(array[i]);
        }

        return result;
    }

    return {
        createBox: function(sourceInstance){
            var box1 = prepareTool.createBox(1);
            if(sourceInstance){
                box1.addComponent(sourceInstance);
            }
            else{
                var sourceInstance = wd.OneToOneSourceInstance.create();
                box1.addComponent(sourceInstance);
            }

            return box1;
        },
        createSphere: function(){
            var sphere = prepareTool.createSphere(1);
            var sourceInstance = wd.OneToOneSourceInstance.create();
            sphere.addComponent(sourceInstance);

            return sphere;
        },
        cloneInstance:function(source, name){
            return source.getComponent(wd.OneToOneSourceInstance).cloneInstance(name);
        },
        createInstance: function(){
            var box = this.createBox();
            var instance = this.cloneInstance(box, "instance");

            return {
                source:box,
                instance:instance
            }
        },
        spyInstanceMethod:function(sandbox, instanceArr, methodName){
            var spy = function(instance){
                sandbox.spy(instance, methodName);

                instance.forEach(function(child){
                    spy(child, methodName);
                })
            }

            instanceArr.forEach(function(instance){
                spy(instance, methodName);
            });
        },
        judgeInstanceCount: function(extensionInstancedArrays, callIndex, count){
            var args = extensionInstancedArrays.drawElementsInstancedANGLE.getCall(callIndex).args;
            expect(args[args.length - 1]).toEqual(count);
        },
        prepareExtensionInstancedArrays: function(sandbox){
            var extensionInstancedArrays = {
                vertexAttribDivisorANGLE: sandbox.stub(),
                drawElementsInstancedANGLE: sandbox.stub(),
                drawArraysInstancedANGLE: sandbox.stub()
            }

            wd.GPUDetector.getInstance().extensionInstancedArrays = extensionInstancedArrays;

            return extensionInstancedArrays;
        },
        judgeMatricesInstancesArray: function (targetMatricesInstancesArray){
            var gl = wd.DeviceManager.getInstance().gl;
            var extensionInstancedArrays = wd.GPUDetector.getInstance().extensionInstancedArrays;

            expect(gl.bufferSubData).toCalledOnce();

            var matricesInstancesArray = gl.bufferSubData.firstCall.args[2];

            var len = Math.min(matricesInstancesArray.length, targetMatricesInstancesArray.length);


            expect(testTool.getValues(
                _sliceArray(matricesInstancesArray, 0, len),
                1)
            ).toEqual(
                testTool.getValues(
                    _sliceArray(targetMatricesInstancesArray, 0, len),
                    1
                )
            )
        },
        judgeSendMatrixVecData: function (location, index){
            var gl = wd.DeviceManager.getInstance().gl;
            var extensionInstancedArrays = wd.GPUDetector.getInstance().extensionInstancedArrays;

            expect(gl.enableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 1)).toCalledOnce();
        },
        judgeUnBindInstancesBuffer: function(location, index){
            var gl = wd.DeviceManager.getInstance().gl;
            var extensionInstancedArrays = wd.GPUDetector.getInstance().extensionInstancedArrays;

            expect(gl.disableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 0)).toCalledOnce();
        }
    }
})();
