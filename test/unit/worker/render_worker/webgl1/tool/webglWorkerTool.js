var webglWorkerTool = (function () {
    return {
        init: function (sandbox) {
            wd.WorkerInstanceData.renderWorker = {
                postMessage: sandbox.stub()
            }

            sandbox.stub(window, "postMessage");

            workerTool.createFakeWorker(sandbox);

            sandbox.stub(window.performance, "now").returns(0);
            // sandbox.stub(wd.WorkerConfig, "renderWorkerDT", renderWorkerDT);

            // wd.SendDrawRenderCommandBufferData.state = wd.ERenderWorkerState.INIT_COMPLETE;
        }
    }
})()

