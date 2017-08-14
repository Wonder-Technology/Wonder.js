describe("defer shading", function () {
    var sandbox = null;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var Log = wdrd.Log;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);

        deferShadingWorkerTool.enableDeferShading(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("init defer shading", function () {
        describe("test in render worker", function () {
            var gl;
            var e;

            beforeEach(function () {
                gl = workerTool.createGL(sandbox);
            });

            it("if not support extensionColorBufferFloat, warn", function () {
                gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", false);
                sandbox.stub(Log, "warn");

                e = {
                    data: {
                        operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
                        geometryData: null,
                        textureData: null,
                        lightData: null,
                        materialData: null,
                        renderData:{
                            deferShading: {
                                isInit: true
                            }
                        }
                    }
                }

                workerTool.execRenderWorkerMessageHandler(e);

                expect(Log.warn).toCalledWith("defer shading need support extensionColorBufferFloat extension")
            });
        });
    });
});

