describe("dispose geometry", function () {
    var sandbox = null;

    var EWorkerOperateType = wd.EWorkerOperateType;
    var MemoryConfig = wd.MemoryConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("disposeComponent", function () {
        describe("if dispose too many components", function () {
            beforeEach(function () {
                sandbox.stub(MemoryConfig, "maxComponentDisposeCount", 2);
            });

            describe("dispose buffers", function () {
                beforeEach(function(){
                })

                describe("test in render worker", function() {
                    var gl;
                    var e;

                    var geo1Index,geo2Index;

                    beforeEach(function () {
                        gl = workerTool.createGL(sandbox);

                        geo1Index = 0;
                        geo2Index = 1;

                        e = {
                            data:{
                                operateType: EWorkerOperateType.DRAW,
                                renderCommandBufferData:null,
                                materialData:null,
                                geometryData:null,
                                lightData:null,
                                disposeData: {
                                    geometryDisposeData:{
                                        disposedGeometryIndexArray: [geo1Index, geo2Index]
                                    },
                                    textureDisposeData: null
                                }
                            }
                        }
                    });

                    describe("dispose buffers", function () {
                        beforeEach(function(){
                            deferShadingTool.disableDeferShading(sandbox);

                        });

                        it("test dispose vao", function () {
                            workerTool.execRenderWorkerMessageHandler(e);


                            expect(gl.deleteVertexArray.callCount).toEqual(2);
                        });
                    });
                });
            });
        });
    });
});
