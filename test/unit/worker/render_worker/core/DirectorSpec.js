describe("Director", function () {
    var sandbox = null;

    var SendDrawRenderCommandData = wd.SendDrawRenderCommandData;
    var ERenderWorkerState = wd.ERenderWorkerState;

    var DeviceManagerWorkerData = wd.DeviceManagerWorkerData;

    var WorkerConfig = wd.WorkerConfig;
    var EWorkerOperateType = wd.EWorkerOperateType;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testRenderWorkerTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testRenderWorkerTool.clear(sandbox);
    });

    describe("render", function () {
        beforeEach(function () {
        });

        describe("render at worker rate", function () {
            var state;
            var renderWorkerDT;

            function judgeInvokeRenderWorkerCount(callCount, expect) {
                expect(DeviceManagerWorkerData.renderWorker.postMessage.withArgs({
                    operateType: EWorkerOperateType.DRAW,
                    renderCommandBufferData:sinon.match.any,
                    materialData:sinon.match.any,
                    geometryData:sinon.match.any
                }).callCount).toEqual(callCount);
            }

            beforeEach(function(){
                SendDrawRenderCommandData.state = ERenderWorkerState.INIT_COMPLETE;

                DeviceManagerWorkerData.renderWorker = {
                    postMessage: sandbox.stub()
                }

                sandbox.stub(window.performance, "now").returns(0);

                renderWorkerDT = 33;

                sandbox.stub(WorkerConfig, "renderWorkerDT", renderWorkerDT);



                sceneTool.prepareGameObjectAndAddToScene();

                state = stateTool.createAndSetFakeGLState(sandbox);


                directorTool.init(state);
            });

            it("test", function () {
                directorTool.loopBody(state, renderWorkerDT - 1);

                judgeInvokeRenderWorkerCount(0, expect);

                directorTool.loopBody(state, renderWorkerDT);

                judgeInvokeRenderWorkerCount(1, expect);

                directorTool.loopBody(state, renderWorkerDT * 2 - 1);

                judgeInvokeRenderWorkerCount(1, expect);

                directorTool.loopBody(state, renderWorkerDT * 2);

                judgeInvokeRenderWorkerCount(2, expect);
            });
            it("if elapsed time exceed multi times of renderWorkerDT, render multi times", function () {
                directorTool.loopBody(state, renderWorkerDT * 2);

                judgeInvokeRenderWorkerCount(2, expect);

                directorTool.loopBody(state, renderWorkerDT * 3 - 1);

                judgeInvokeRenderWorkerCount(2, expect);

                directorTool.loopBody(state, renderWorkerDT * 3);

                judgeInvokeRenderWorkerCount(3, expect);


                directorTool.loopBody(state, renderWorkerDT * 6);

                judgeInvokeRenderWorkerCount(6, expect);
            });
        });
    });
});
