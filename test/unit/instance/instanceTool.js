var instanceTool = (function(){
    return {
        createBox: function(){
            var box1 = prepareTool.createBox(1);
            var sourceInstance = wd.SourceInstance.create();
            box1.addComponent(sourceInstance);

            return box1;
        },
        cloneInstance:function(source, name){
            return source.getComponent(wd.SourceInstance).cloneInstance(name);
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
        }
    }
})();
