describe("draw render command buffer", function () {
    var sandbox = null;

    var worker;

    var EWorkerOperateType = wd.EWorkerOperateType;

    var MaterialData = wd.MaterialData;

    var ERenderWorkerState = wdrd.ERenderWorkerState;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    describe("test in render worker", function () {
        var gl;
        var e;

        beforeEach(function () {
            gl = workerTool.createGL(sandbox);

            e = {
                data: {
                    operateType: EWorkerOperateType.DRAW,
                    textureData:null,
                    renderCommandBufferData: null,
                    geometryData: null,
                    materialData: null,
                    lightData: null,
                    disposeData: null
                }
            }
        });

        it("commit gl", function () {
            workerTool.execRenderWorkerMessageHandler(e);

            expect(gl.commit).toCalledOnce();
        });
        it("send DRAW_COMPLEMENT message", function () {
            workerTool.execRenderWorkerMessageHandler(e);

            var postMessage = workerTool.getWorkerPostMessage();
            expect(postMessage.withArgs({
                state: ERenderWorkerState.DRAW_COMPLETE
            })).toCalledOnce();
        });
    });
});

