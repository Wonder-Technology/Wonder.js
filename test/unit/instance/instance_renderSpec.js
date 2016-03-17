describe("use instance to batch draw calls", function(){
    var gl = null;
    var device;
    var sandbox;
    var director;

    var extensionInstancedArrays;

    var box1,box1Instance1,box1Instance2;
    var box1Child1;

    var renderer;
    var camera;

    function prepareWithoutChild(){
        box1 = prepareTool.createBox(1);
        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = box1.cloneInstance(String(0));
        box1Instance2 = box1.cloneInstance(String(1));

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);




        director.scene.addChild(camera);

        director._init();
    }

    function prepareWithChild(){
        box1 = prepareTool.createBox(1);
        box1Child1 = prepareTool.createSphere(1)

        box1.addChild(box1Child1);

        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = box1.cloneInstance(String(0));
        box1Instance2 = box1.cloneInstance(String(1));

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);


        director.scene.addChild(camera);

        director._init();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);



        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance();

        wd.DebugStatistics.clear();
    });

    describe("test render count", function(){
        beforeEach(function(){
        });

        it("test no box1Child1", function(){
            prepareWithoutChild();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
        });
        it("test with child", function(){
            prepareWithChild();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(box1Child1.render).toCalledOnce();
            expect(box1Instance1.getChild(0).render).not.toCalled();
            expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(6);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    describe("can vary instance's modelMatrix(position,rotation,scale)", function(){
        var mMatrixPos;

        function judgeModelMatricesInstancesArray(){
            expect(gl.uniformMatrix4fv.withArgs(mMatrixPos)).not.toCalled();

            expect(gl.bufferSubData).toCalledOnce();

            var targetModelMatricesInstancesArray = new Float32Array(1000);
            box1.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 0);
            box1Instance1.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 16);
            box1Instance2.transform.localToWorldMatrix.cloneToArray(targetModelMatricesInstancesArray, 32);


            var modelMatricesInstancesArray = gl.bufferSubData.firstCall.args[2];

            modelMatricesInstancesArray.forEach(function(data, index){
                expect(data).toEqual(targetModelMatricesInstancesArray[index]);
            });
        }

        function judgeSendModelMatrixVecData(location, index){
            expect(gl.enableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(gl.vertexAttribPointer.withArgs(location, 4, gl.FLOAT, false, 64, index * 16)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 1)).toCalledOnce();
        }

        function judgeUnBindInstancesBuffer(location, index){
            expect(gl.disableVertexAttribArray.withArgs(location)).toCalledOnce();
            expect(extensionInstancedArrays.vertexAttribDivisorANGLE.withArgs(location, 0)).toCalledOnce();
        }

        beforeEach(function(){
            prepareWithoutChild();
        });

        it("send the model matrix data by send 4 vec4 attribute data(because the max attribute data is vec4, not support mat)", function () {
            box1Instance1.transform.position = wd.Vector3.create(1,1,1);
            box1Instance1.transform.scale = wd.Vector3.create(3,3,3);

            box1Instance2.transform.rotation = wd.Quaternion.create(2,2,2,1);

            mMatrixPos = 1;
            gl.getUniformLocation.withArgs("mMatrix").returns(mMatrixPos);

            var offsetLocation0 = 11,
                offsetLocation1 = 12,
                offsetLocation2 = 13,
                offsetLocation3 = 14;

            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0").returns(offsetLocation0);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1").returns(offsetLocation1);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2").returns(offsetLocation2);
            gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3").returns(offsetLocation3);




            director.scene.gameObjectScene.render(renderer);
            renderer.render();




            judgeModelMatricesInstancesArray();

            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_0")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_1")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_2")).toCalledOnce();
            expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_mVec4_3")).toCalledOnce();

            judgeSendModelMatrixVecData(offsetLocation0, 0);
            judgeSendModelMatrixVecData(offsetLocation1, 1);
            judgeSendModelMatrixVecData(offsetLocation2, 2);
            judgeSendModelMatrixVecData(offsetLocation3, 3);

            judgeUnBindInstancesBuffer(offsetLocation0, 0);
            judgeUnBindInstancesBuffer(offsetLocation1, 1);
            judgeUnBindInstancesBuffer(offsetLocation2, 2);
            judgeUnBindInstancesBuffer(offsetLocation3, 3);
        });
    });

    it("batch draw call", function () {
        prepareWithoutChild();

        director.scene.gameObjectScene.render(renderer);
        renderer.render();

        expect(gl.drawElements).not.toCalled();

        expect(wd.DebugStatistics.count.drawCalls).toEqual(1);

        expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();

        expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount).toEqual(2);

        expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledAfter(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER));
    });

    it("if hardware not support instance, draw one instance in one draw call", function(){
        wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        prepareWithoutChild();

        director.scene.gameObjectScene.render(renderer);
        renderer.render();

        expect(gl.drawElements.callCount).toEqual(3);
        expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
        expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
    });

    it("if no indices, drawArraysInstancedANGLE", function () {
        prepareWithoutChild();
        sandbox.stub(box1.getComponent(wd.Geometry).buffers, "getChild").withArgs(wd.EBufferDataType.INDICE).returns(null);
        var vertexBuffer = {
            count:100
        };
        box1.getComponent(wd.Geometry).buffers.getChild.withArgs(wd.EBufferDataType.VERTICE).returns(vertexBuffer);

        director.scene.gameObjectScene.render(renderer);
        renderer.render();

        expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        expect(extensionInstancedArrays.drawArraysInstancedANGLE).toCalledOnce();
        expect(extensionInstancedArrays.drawArraysInstancedANGLE).toCalledWith(gl.TRIANGLES, 0, 100, 3);
    });

    //todo test instance buffer(bufferData,bindBuffer...) (modelMatricesInstancesArray->size)
    //todo test cache instance buffer
    describe("test instance buffer", function(){
        beforeEach(function(){

        });

        it("create buffer one time only when first draw", function(){
            prepareWithoutChild();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            var createCount = gl.createBuffer.callCount;
            expect(gl.bufferSubData).toCalledOnce();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.createBuffer.callCount).toEqual(createCount);
            expect(gl.bufferSubData).toCalledTwice();
        });

        //describe("test buffer size", function(){
        //    beforeEach(function(){
        //
        //    });
        //
        //    it("if instance matrixs size not exceed buffer size, not recreate buffer", function(){
        //        prepareWithoutChild();
        //
        //        director.scene.gameObjectScene.render(renderer);
        //
        //        //expect(gl.createBuffer).toCalledOnce();
        //
        //        var cmd = renderer._commandQueue.getChild(0);
        //        //cmd.instanceBuffer = wd.InstanceBuffer.create();
        //        cmd.instanceBuffer.size = 10 * 16 * 4;
        //
        //        renderer.render();
        //
        //        expect(gl.createBuffer.callCount).toEqual(4);
        //    });
        //    it("else, recreate buffer and update the size", function () {
        //        prepareWithoutChild();
        //
        //        director.scene.gameObjectScene.render(renderer);
        //
        //        expect(gl.createBuffer).toCalledOnce();
        //
        //        var cmd = renderer._commandQueue.getChild(0);
        //        //cmd.instanceBuffer = wd.InstanceBuffer.create();
        //        cmd.instanceBuffer.size = 1 * 16 * 4;
        //
        //        renderer.render();
        //
        //        expect(gl.deleteBuffer).toCalledOnce();
        //        expect(gl.createBuffer.callCount).toEqual(5);
        //    });
        //    it("", function () {
        //
        //    });
        //
        //});


        //todo test delete buffer
    });


    //todo test dynamic add/remove instance

    //todo instance transform can vary independent



    describe("cloneInstance", function(){
        beforeEach(function(){

        });

        it("test instance name", function () {
            box1 = prepareTool.createBox(1);

            box1Instance1 = box1.cloneInstance("instance1");

            expect(box1Instance1.name).toEqual("instance1");
        });

        describe("test instance->components", function(){
            beforeEach(function(){
            });

            it("share source->geometry", function(){
                box1 = prepareTool.createBox(1);

                box1Instance1 = box1.cloneInstance();

                expect(box1Instance1.getComponent(wd.Geometry) === box1.getComponent(wd.Geometry)).toBeTruthy();
            });
            it("clone other components", function () {
                box1 = prepareTool.createBox(1);
                box1.forEachComponent(function(component){
                    sandbox.spy(component, "clone");
                });

                box1Instance1 = box1.cloneInstance();

                expect(box1Instance1.getComponent(wd.MeshRenderer) === box1.getComponent(wd.MeshRenderer)).toBeFalsy();
                box1.forEachComponent(function(component){
                    if(!(component instanceof wd.Geometry)){
                        expect(component.clone).toCalledOnce();
                    }
                });
            });

            //todo test more(clone scriptList? ...)
        });
    });

    //todo test procedural texture(ProceduralCommand)?

    //todo test collision,picking,shadow,lod with instance
});
