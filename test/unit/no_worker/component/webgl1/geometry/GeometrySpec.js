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

                        var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                        var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

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


                        gameObjectTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectTool.disposeComponent(obj2, geo2);

                        expect(gl.deleteBuffer.callCount).toEqual(4);
                        expect(gl.deleteBuffer.firstCall).toCalledWith(buffer1)
                        expect(gl.deleteBuffer.secondCall).toCalledWith(buffer2)
                        expect(gl.deleteBuffer.thirdCall).toCalledWith(buffer3)
                        expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4)
                    });
                    it("test dispose normal buffers", function () {
                        var geo1 = boxGeometryTool.create();
                        var geo2 = boxGeometryTool.create();

                        var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1, lightMaterialTool.create());
                        var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

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

                        gameObjectTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectTool.disposeComponent(obj2, geo2);

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

                        var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                        var mat1 = data1.material;


                        var texture = textureTool.create();
                        textureTool.setSource(texture, {})

                        basicMaterialTool.addMap(mat1, texture);


                        var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);



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

                        gameObjectTool.disposeComponent(obj1, geo1);


                        expect(gl.deleteBuffer.callCount).toEqual(0);



                        gameObjectTool.disposeComponent(obj2, geo2);

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

                    it("test dispose vao", function () {
                        var geo1 = boxGeometryTool.create();
                        var geo2 = boxGeometryTool.create();

                        var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                        var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);

                        var obj1 = data1.gameObject,
                            obj2 = data2.gameObject;

                        directorTool.init(sandbox);


                        var buffer1 = {},
                            buffer2 = {a:2};

                        extension.createVertexArrayOES.onCall(0).returns(buffer1);
                        extension.createVertexArrayOES.onCall(1).returns(buffer2);


                        directorTool.loopBody(null, null);


                        gameObjectTool.disposeComponent(obj1, geo1);


                        expect(extension.deleteVertexArrayOES.callCount).toEqual(0);



                        gameObjectTool.disposeComponent(obj2, geo2);

                        expect(extension.deleteVertexArrayOES.callCount).toEqual(2);
                        expect(extension.deleteVertexArrayOES.firstCall).toCalledWith(buffer1)
                        expect(extension.deleteVertexArrayOES.getCall(1)).toCalledWith(buffer2)
                    });
                });
            });
        });
    });
});
