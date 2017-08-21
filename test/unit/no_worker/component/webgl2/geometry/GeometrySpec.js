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
        describe("if dispose too many components", function () {
            beforeEach(function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);
                deferShadingTool.disableDeferShading(sandbox);
            });

            describe("dispose buffers", function () {
                // var gl;
                // var state;
                //
                // beforeEach(function () {
                //     state = stateTool.createAndSetFakeGLState(sandbox);
                //
                //     gl = stateTool.getGLFromFakeGLState(state);
                // });
                //
                // it("test dispose vao", function () {
                //     var geo1 = boxGeometryTool.create();
                //     var geo2 = boxGeometryTool.create();
                //
                //     var data1 = sceneTool.prepareGameObjectAndAddToScene(false, geo1);
                //     var data2 = sceneTool.prepareGameObjectAndAddToScene(true, geo2);
                //
                //     var obj1 = data1.gameObject,
                //         obj2 = data2.gameObject;
                //
                //     directorTool.init(state);
                //
                //
                //     var buffer1 = {},
                //         buffer2 = { a: 2 };
                //
                //     gl.createVertexArray.onCall(0).returns(buffer1);
                //     gl.createVertexArray.onCall(1).returns(buffer2);
                //
                //
                //     directorTool.loopBody(state);
                //
                //
                //     gameObjectTool.disposeComponent(obj1, geo1);
                //
                //
                //     expect(gl.deleteVertexArray.callCount).toEqual(0);
                //
                //
                //     gameObjectTool.disposeComponent(obj2, geo2);
                //
                //     expect(gl.deleteVertexArray.callCount).toEqual(2);
                //     expect(gl.deleteVertexArray.firstCall).toCalledWith(buffer1)
                //     expect(gl.deleteVertexArray.getCall(1)).toCalledWith(buffer2)
                // });

                describe("test dispose vao", function () {
                    var state;
                    var gl;
                    var obj1,obj2;
                    var buffer1,buffer2;

                    function getCreateVertexArray() {
                        return gl.createVertexArray;
                    }

                    function getDeleteVertexArray() {
                        return gl.deleteVertexArray;
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


                        gameObjectTool.dispose(obj1);


                        expect(getDeleteVertexArray().callCount).toEqual(0);


                        gameObjectTool.dispose(obj2);

                        expect(getDeleteVertexArray().callCount).toEqual(2);
                        expect(getDeleteVertexArray().firstCall).toCalledWith(buffer1)
                        expect(getDeleteVertexArray().getCall(1)).toCalledWith(buffer2)
                    });
                    it("delete vbos in vao", function () {
                        var buffer1 = {b:1};
                        var buffer2 = {b:2};
                        var buffer3 = {b:3};
                        var buffer4 = {b:4};

                        gl.createBuffer.onCall(2).returns(buffer1);
                        gl.createBuffer.onCall(3).returns(buffer2);
                        gl.createBuffer.onCall(4).returns(buffer3);
                        gl.createBuffer.onCall(5).returns(buffer4);


                        directorTool.loopBody(state);


                        gameObjectTool.dispose(obj1);
                        gameObjectTool.dispose(obj2);


                        expect(gl.deleteBuffer.callCount).toEqual(4);
                        expect(gl.deleteBuffer.getCall(0)).toCalledWith(buffer1);
                        expect(gl.deleteBuffer.getCall(1)).toCalledWith(buffer2);
                        expect(gl.deleteBuffer.getCall(2)).toCalledWith(buffer3);
                        expect(gl.deleteBuffer.getCall(3)).toCalledWith(buffer4);
                    });
                    it("test bind vao when draw gameObject after dispose vao", function () {
                        directorTool.loopBody(state);


                        gameObjectTool.dispose(obj1);
                        gameObjectTool.dispose(obj2);


                        var geo3 = boxGeometryTool.create();
                        var data3 = sceneTool.prepareGameObjectAndAddToScene(true, geo3);

                        gameObjectTool.init(data3.gameObject);


                        directorTool.loopBody(null, null);

                        expect(getCreateVertexArray().callCount).toEqual(3)
                    });
                });
            });
        });
    });
});
