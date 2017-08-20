describe("Director", function () {
    var sandbox = null;

    var SendDrawRenderCommandBufferData = wd.SendDrawRenderCommandBufferData;

    var WorkerInstanceData = wd.WorkerInstanceData;

    var WorkerConfig = wd.WorkerConfig;
    var EWorkerOperateType = wd.EWorkerOperateType;

    var ERenderWorkerState = wdrd.ERenderWorkerState;

    function judgeInvokeRenderWorkerCount(callCount, expect) {
        expect(workerTool.getRenderWorker().postMessage.withArgs({
            operateType: EWorkerOperateType.DRAW,
            renderCommandBufferData:sinon.match.any,
            materialData:sinon.match.any,
            geometryData:sinon.match.any,
            lightData:sinon.match.any,
            disposeData:sinon.match.any
        }).callCount).toEqual(callCount);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);
    });
    afterEach(function () {
        sandbox.restore();

        testTool.clear(sandbox);
    });

    // describe("render", function () {
    //     beforeEach(function () {
    //     });
    //
    //     describe("render at worker rate", function () {
    //         var state;
    //         var renderWorkerDT;
    //
    //         beforeEach(function(){
    //             renderWorkerDT = 33;
    //
    //             sandbox.stub(WorkerConfig, "renderWorkerDT", renderWorkerDT);
    //
    //
    //
    //             sceneTool.prepareGameObjectAndAddToScene();
    //
    //             state = stateTool.createAndSetFakeGLState(sandbox);
    //
    //
    //             directorTool.init(state);
    //         });
    //
    //         it("test", function () {
    //             directorTool.loopBody(state, renderWorkerDT - 1);
    //
    //             judgeInvokeRenderWorkerCount(0, expect);
    //
    //             directorTool.loopBody(state, renderWorkerDT);
    //
    //             judgeInvokeRenderWorkerCount(1, expect);
    //
    //             directorTool.loopBody(state, renderWorkerDT * 2 - 1);
    //
    //             judgeInvokeRenderWorkerCount(1, expect);
    //
    //             directorTool.loopBody(state, renderWorkerDT * 2);
    //
    //             judgeInvokeRenderWorkerCount(2, expect);
    //         });
    //         it("if elapsed time exceed multi times of renderWorkerDT, render multi times", function () {
    //             directorTool.loopBody(state, renderWorkerDT * 2);
    //
    //             judgeInvokeRenderWorkerCount(2, expect);
    //
    //             directorTool.loopBody(state, renderWorkerDT * 3 - 1);
    //
    //             judgeInvokeRenderWorkerCount(2, expect);
    //
    //             directorTool.loopBody(state, renderWorkerDT * 3);
    //
    //             judgeInvokeRenderWorkerCount(3, expect);
    //
    //
    //             directorTool.loopBody(state, renderWorkerDT * 6);
    //
    //             judgeInvokeRenderWorkerCount(6, expect);
    //         });
    //     });
    // });

    describe("run", function() {
        var state;

        function judgeInvokeSyncCount(callCount, expect){
            expect(directorTool.getDirector()._timeController.tick.callCount).toEqual(callCount);
        }

        beforeEach(function(){
            sandbox.stub(directorTool.getDirector()._timeController, "tick");

            var data = sceneTool.prepareGameObjectAndAddToScene();

            // var gameObject = data.gameObject;
            // // var tra = gameObjectTool.getTransform(gameObject);

            state = stateTool.createAndSetFakeGLState(sandbox);

            directorTool.init(state);
        });

        it("wait for init_complete", function () {
            directorTool.loopBody(state, 1);

            judgeInvokeSyncCount(0, expect);
            judgeInvokeRenderWorkerCount(0, expect);


            sendDrawRendercommandBufferTool.markInitComplete();

            directorTool.loopBody(state, 2);

            judgeInvokeSyncCount(0, expect);
            judgeInvokeRenderWorkerCount(1, expect);
        });

        describe("if init complete", function() {
            beforeEach(function(){
                sendDrawRendercommandBufferTool.markInitComplete();
            });

            it("in the first frame, not sync, only render", function(){
                directorTool.loopBody(state, 1);

                judgeInvokeSyncCount(0, expect);
                judgeInvokeRenderWorkerCount(1, expect);
            });

            describe("test sync", function() {
                beforeEach(function(){
                    directorTool.loopBody(state, 1);

                    SendDrawRenderCommandBufferData.state = ERenderWorkerState.DRAW_COMPLETE;

                    directorTool.loopBody(state, 2);
                });

                it("sync after complete draw", function () {
                    judgeInvokeSyncCount(1, expect);
                });
                it("not render when sync", function () {
                    judgeInvokeRenderWorkerCount(1, expect);
                });

                it("tick when sync", function () {
                    expect(directorTool.getDirector()._timeController.tick.callCount).toEqual(1);
                });
            });

            it("not render when draw is not complete", function () {
                directorTool.loopBody(state, 1);

                directorTool.loopBody(state, 2);

                judgeInvokeRenderWorkerCount(1, expect);

                SendDrawRenderCommandBufferData.state = ERenderWorkerState.DRAW_COMPLETE;

                directorTool.loopBody(state, 3);

                judgeInvokeRenderWorkerCount(1, expect);



                directorTool.loopBody(state, 4);


                judgeInvokeRenderWorkerCount(2, expect);


                directorTool.loopBody(state, 5);

                judgeInvokeRenderWorkerCount(2, expect);
            });
        });
    });
});
