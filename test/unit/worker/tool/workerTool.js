var workerTool = (function () {
    return {
        init: function (sandbox) {
            wd.DeviceManagerWorkerData.renderWorker = {
                postMessage: sandbox.stub()
            }

            workerTool.createFakeWorker(sandbox);
        },
        createFakeWorker: function (sandbox) {
            var Worker = function (filePath) {
                this.filePath = filePath;
            }

            Worker.prototype.postMessage = sandbox.stub();

            window.Worker = Worker;
        },
        getRenderWorker: function () {
            return wd.DeviceManagerWorkerData.renderWorker;
        },
        execRenderWorkerMessageHandler: function (e) {
            window.onmessage(e);
        }
    }
})()

