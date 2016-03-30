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
        box1 = instanceTool.createBox();
        box1.name = "box1";

        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = instanceTool.cloneInstance(box1, "0");
        box1Instance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);



    }

    function prepareWithChild(){
        box1 = instanceTool.createBox(1);
        box1.name = "box1";

        box1Child1 = prepareTool.createSphere(1)
        box1Child1.name = "box1Child1";

        box1.addChild(box1Child1);

        var instanceArr = [];

        instanceArr.push(box1);

        box1Instance1 = instanceTool.cloneInstance(box1, "0");
        box1Instance2 = instanceTool.cloneInstance(box1, "1");

        instanceArr.push(box1Instance1, box1Instance2);

        instanceTool.spyInstanceMethod(sandbox, instanceArr, "render");


        director.scene.addChildren(instanceArr);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        wd.DebugStatistics.clear();

        device = wd.DeviceManager.getInstance();

        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        director = wd.Director.getInstance();

        extensionInstancedArrays = instanceTool.prepareExtensionInstancedArrays(sandbox);



        camera = testTool.createCamera();
        renderer = wd.WebGLRenderer.create();


        director.scene.addChild(camera);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clearInstance();
    });

    describe("test render count", function(){
        beforeEach(function(){
        });

        it("test no box1Child1", function(){
            prepareWithoutChild();
            director._init();

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

            director._init();

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
            director._init();
        });

        it("send the model matrix data by send 4 vec4 attribute data(because the max attribute data is vec4, not support mat)", function () {
            box1Instance1.transform.position = wd.Vector3.create(1,1,1);
            box1Instance1.transform.scale = wd.Vector3.create(3,3,3);

            box1Instance2.transform.rotation = wd.Quaternion.create(2,2,2,1);

            mMatrixPos = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

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

    describe("batch draw call", function () {
        it("test when only one instance with children", function () {
            box1 = instanceTool.createBox(1);

            box1Child1 = prepareTool.createSphere(1);

            box1.addChild(box1Child1);

            var instanceArr = [];

            instanceArr.push(box1);

            director.scene.addChildren(instanceArr);

            director.scene.addChild(camera);



            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.drawElements).not.toCalled();

            expect(wd.DebugStatistics.count.drawCalls).toEqual(2);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();
        });
        it("test multi instances", function () {
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.drawElements).not.toCalled();

            expect(wd.DebugStatistics.count.drawCalls).toEqual(1);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledOnce();

            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER).callCount).toEqual(2);

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledAfter(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER));
        });
    });

    describe("remove object instance", function () {
        beforeEach(function () {
        });

        it("not render it and its children", function () {
            prepareWithChild();

            director._init();



            director.scene.removeChild(box1Instance1);



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            expect(box1.render).toCalledOnce();
            expect(box1Instance1.render).not.toCalled();
            expect(box1Instance2.render).not.toCalled();

            expect(box1Child1.render).toCalledOnce();
            expect(box1Instance1.getChild(0).render).not.toCalled();
            expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 2);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 2);
        });
    });

    describe("add object instance after remove", function () {
        beforeEach(function () {
        });

        it("render it and its children", function () {
            prepareWithChild();

            director._init();



            director.scene.removeChild(box1Instance1);
            director.scene.addChild(box1Instance1);



            director.scene.gameObjectScene.render(renderer);
            renderer.render();



            //expect(box1.render).toCalledOnce();
            //expect(box1Instance1.render).not.toCalled();
            //expect(box1Instance2.render).not.toCalled();
            //
            //expect(box1Child1.render).toCalledOnce();
            //expect(box1Instance1.getChild(0).render).not.toCalled();
            //expect(box1Instance2.getChild(0).render).not.toCalled();

            expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


            expect(gl.drawElements).not.toCalled();

            expect(extensionInstancedArrays.drawElementsInstancedANGLE).toCalledTwice();

            instanceTool.judgeInstanceCount(extensionInstancedArrays, 0, 3);
            instanceTool.judgeInstanceCount(extensionInstancedArrays, 1, 3);
        });
    });

    describe("if hardware not support instance", function(){
        beforeEach(function(){
            wd.GPUDetector.getInstance().extensionInstancedArrays = null;
        });

        it("draw one instance in one draw call", function () {
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.drawElements.callCount).toEqual(3);
            expect(wd.DebugStatistics.count.drawCalls).toEqual(3);
            expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
        });
        it("send mMatrix data to glsl", function () {
            prepareWithoutChild();
            director._init();

            var mMatrixPos = 1;
            gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(mMatrixPos);

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.uniformMatrix4fv.withArgs(mMatrixPos).callCount).toEqual(3);
        });

        describe("remove object instance", function () {
            beforeEach(function () {
            });

            it("not render it and its children", function () {
                prepareWithChild();

                director._init();



                director.scene.removeChild(box1Instance1);



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(box1.render).toCalledOnce();
                expect(box1Instance1.render).not.toCalled();
                expect(box1Instance2.render).toCalledOnce();

                expect(box1Child1.render).toCalledOnce();
                expect(box1Instance1.getChild(0).render).not.toCalled();
                expect(box1Instance2.getChild(0).render).toCalledOnce();

                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 2);


                expect(gl.drawElements.callCount).toEqual(2 * 2);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });

        describe("add object instance after remove", function () {
            beforeEach(function () {
            });

            it("render it and its children", function () {
                prepareWithChild();

                director._init();



                director.scene.removeChild(box1Instance1);
                director.scene.addChild(box1Instance1);



                director.scene.gameObjectScene.render(renderer);
                renderer.render();



                expect(wd.DebugStatistics.count.renderGameObjects).toEqual(2 * 3);


                expect(gl.drawElements.callCount).toEqual(2 * 3);

                expect(extensionInstancedArrays.drawElementsInstancedANGLE).not.toCalled();
            });
        });
    });

    it("if no indices, drawArraysInstancedANGLE", function () {
        prepareWithoutChild();
        director._init();

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

    describe("test instance buffer", function(){
        beforeEach(function(){
        });

        it("create buffer one time only when first draw", function(){
            prepareWithoutChild();
            director._init();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            var createCount = gl.createBuffer.callCount;
            expect(gl.bufferSubData).toCalledOnce();

            director.scene.gameObjectScene.render(renderer);
            renderer.render();

            expect(gl.createBuffer.callCount).toEqual(createCount);
            expect(gl.bufferSubData).toCalledTwice();
        });
    });


    //todo test dynamic add/remove instance

    //todo instance transform can vary independent


    //todo test procedural texture(ProceduralCommand)?

    //todo test collision,picking,shadow,lod with instance
});
