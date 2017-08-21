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

                    beforeEach(function(){
                        state = stateTool.createAndSetFakeGLState(sandbox);

                        gl = stateTool.getGLFromFakeGLState(state);

                        geometrySystemTool.judgeDisposeVao(state, function () {
                            return gl.createVertexArray;
                        }, function () {
                            return gl.deleteVertexArray;
                        })
                    });

                    it("test dispose", function () {
                    });
                    it("test bind vao when draw gameObject after dispose vao", function () {
                        var geo3 = boxGeometryTool.create();
                        var data3 = sceneTool.prepareGameObjectAndAddToScene(true, geo3);

                        gameObjectTool.init(data3.gameObject);


                        directorTool.loopBody(null, null);

                        expect(gl.createVertexArray.callCount).toEqual(3)
                    });
                });
            });
        });
    });
});
