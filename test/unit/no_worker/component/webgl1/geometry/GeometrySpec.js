describe("Geometry", function () {
    var sandbox = null;

    var MemoryConfig = wd.MemoryConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        testTool.clear(sandbox);

        sandbox.restore();
    });

    describe("disposeComponent", function () {
        describe("if dispose too many components", function() {
            beforeEach(function(){
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);
            });

            describe("dispose buffers", function(){
                describe("if not support vao", function() {
                    beforeEach(function(){
                        gpuDetectTool.setGPUDetectData("extensionVao", null);
                    });

                    it("test dispose vertex buffers and index buffer", function () {
                        var geo1 = boxGeometryTool.create();
                        var geo2 = boxGeometryTool.create();

                        var data1 = sceneSystemTool.prepareGameObjectAndAddToScene(false, geo1);
                        var data2 = sceneSystemTool.prepareGameObjectAndAddToScene(true, geo2);

                        var obj1 = data1.gameObject,
                            obj2 = data2.gameObject;

                        directorTool.init(sandbox);


                        var buffer1 = {},
                            buffer2 = {a:2},
                            buffer3 = {a:3},
                            buffer4 = {a:4};

                        var gl = stateTool.getGLFromFakeGLState(null);
                        gl.createBuffer.onCall(0).returns(buffer1);
                        gl.createBuffer.onCall(1).returns(buffer2);
                        gl.createBuffer.onCall(2).returns(buffer3);
                        gl.createBuffer.onCall(3).returns(buffer4);


                        directorTool.loopBody(null, null);


                        gameObjectSystemTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectSystemTool.disposeComponent(obj2, geo2);

                        expect(gl.deleteBuffer.callCount).toEqual(4);
                        expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                        expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                        expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                        expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                    });
                    it("test dispose normal buffers", function () {
                        var geo1 = boxGeometryTool.create();
                        var geo2 = boxGeometryTool.create();

                        var data1 = sceneSystemTool.prepareGameObjectAndAddToScene(false, geo1, lightMaterialTool.create());
                        var data2 = sceneSystemTool.prepareGameObjectAndAddToScene(true, geo2);

                        var obj1 = data1.gameObject,
                            obj2 = data2.gameObject;

                        directorTool.init(sandbox);


                        var buffer1 = {},
                            buffer2 = {a:2},
                            buffer3 = {a:3},
                            buffer4 = {a:4},
                            buffer5 = {a:5};

                        var gl = stateTool.getGLFromFakeGLState(null);
                        gl.createBuffer.onCall(0).returns(buffer1);
                        gl.createBuffer.onCall(1).returns(buffer2);
                        gl.createBuffer.onCall(2).returns(buffer3);
                        gl.createBuffer.onCall(3).returns(buffer4);
                        gl.createBuffer.onCall(4).returns(buffer5);


                        directorTool.loopBody(null, null);

                        gameObjectSystemTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectSystemTool.disposeComponent(obj2, geo2);

                        expect(gl.deleteBuffer.callCount).toEqual(5);
                        expect(gl.deleteBuffer.firstCall).toCalledWith(buffer3)
                        expect(gl.deleteBuffer.secondCall).toCalledWith(buffer4)
                        expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer5)
                        expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer1)
                        expect(gl.deleteBuffer.getCall(4)).toCalledWith(buffer2)
                    });
                    it("test dispose texCoord buffers", function () {
                        var geo1 = boxGeometryTool.create();
                        var geo2 = boxGeometryTool.create();

                        var data1 = sceneSystemTool.prepareGameObjectAndAddToScene(false, geo1);
                        var mat1 = data1.material;


                        var texture = textureSystemTool.create();
                        textureSystemTool.setSource(texture, {})

                        basicMaterialTool.setMap(mat1, texture);


                        var data2 = sceneSystemTool.prepareGameObjectAndAddToScene(true, geo2);



                        var obj1 = data1.gameObject,
                            obj2 = data2.gameObject;

                        directorTool.init(sandbox);


                        var buffer1 = {},
                            buffer2 = {a:2},
                            buffer3 = {a:3},
                            buffer4 = {a:4},
                            buffer5 = {a:5};

                        var gl = stateTool.getGLFromFakeGLState(null);
                        gl.createBuffer.onCall(0).returns(buffer1);
                        gl.createBuffer.onCall(1).returns(buffer2);
                        gl.createBuffer.onCall(2).returns(buffer3);
                        gl.createBuffer.onCall(3).returns(buffer4);
                        gl.createBuffer.onCall(4).returns(buffer5);


                        directorTool.loopBody(null, null);

                        gameObjectSystemTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectSystemTool.disposeComponent(obj2, geo2);

                        expect(gl.deleteBuffer.callCount).toEqual(5);
                        expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                        expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                        expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                        expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                        expect(gl.deleteBuffer.getCall(4)).toCalledWith(buffer5)
                    });
                });

                describe("if support vao", function() {
                    var extension;

                    beforeEach(function(){
                        extension = {
                            createVertexArrayOES:sandbox.stub(),
                            bindVertexArrayOES:sandbox.stub(),
                            deleteVertexArrayOES:sandbox.stub()
                        }

                        gpuDetectTool.setGPUDetectData("extensionVao", extension);
                    });

                    describe("test dispose vao", function () {
                        var state;
                        var gl;
                        var obj1,obj2;
                        var buffer1,buffer2;

                        function getCreateVertexArray() {
                            return extension.createVertexArrayOES;
                        }

                        function getDeleteVertexArray() {
                            return extension.deleteVertexArrayOES;
                        }

                        beforeEach(function(){
                            state = stateTool.createAndSetFakeGLState(sandbox);

                            gl = stateTool.getGLFromFakeGLState(state);


                            var data = geometrySystemTool.prepareDisposeVao(state, getCreateVertexArray)

                            obj1 = data.obj1;
                            obj2 = data.obj2;
                            buffer1 = data.buffer1;
                            buffer2 = data.buffer2;
                        });

                        it("delete vao", function () {
                            directorTool.loopBody(state);


                            gameObjectSystemTool.dispose(obj1);


                            expect(getDeleteVertexArray().callCount).toEqual(0);


                            gameObjectSystemTool.dispose(obj2);

                            expect(getDeleteVertexArray().callCount).toEqual(2);
                            expect(getDeleteVertexArray().firstCall).toCalledWith(buffer1)
                            expect(getDeleteVertexArray().getCall(1)).toCalledWith(buffer2)
                        });
                        it("delete vbos in vao", function () {
                            var buffer1 = {b:1};
                            var buffer2 = {b:2};
                            var buffer3 = {b:3};
                            var buffer4 = {b:4};

                            gl.createBuffer.onCall(0).returns(buffer1);
                            gl.createBuffer.onCall(1).returns(buffer2);
                            gl.createBuffer.onCall(2).returns(buffer3);
                            gl.createBuffer.onCall(3).returns(buffer4);


                            directorTool.loopBody(state);


                            gameObjectSystemTool.dispose(obj1);
                            gameObjectSystemTool.dispose(obj2);


                            expect(gl.deleteBuffer.callCount).toEqual(4);
                            expect(gl.deleteBuffer.getCall(0)).toCalledWith(buffer1);
                            expect(gl.deleteBuffer.getCall(1)).toCalledWith(buffer2);
                            expect(gl.deleteBuffer.getCall(2)).toCalledWith(buffer3);
                            expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4);
                        });
                        it("test bind vao when draw gameObject after dispose vao", function () {
                            directorTool.loopBody(state);


                            gameObjectSystemTool.dispose(obj1);
                            gameObjectSystemTool.dispose(obj2);


                            var geo3 = boxGeometryTool.create();
                            var data3 = sceneSystemTool.prepareGameObjectAndAddToScene(true, geo3);

                            gameObjectSystemTool.init(data3.gameObject);


                            directorTool.loopBody(null, null);

                            expect(getCreateVertexArray().callCount).toEqual(3)
                        });
                    });
                });
            });
        });
    });
});
