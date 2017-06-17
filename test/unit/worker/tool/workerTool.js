var workerTool = (function () {
    var renderWorkerDT = 33;

    return {
        init: function (sandbox) {
            wd.WorkerInstanceData.renderWorker = {
                postMessage: sandbox.stub()
            }

            sandbox.stub(window, "postMessage");

            workerTool.createFakeWorker(sandbox);

            sandbox.stub(window.performance, "now").returns(0);
            sandbox.stub(wd.WorkerConfig, "renderWorkerDT", renderWorkerDT);
        },
        runRender: function (count) {
            directorTool.loopBody(null, renderWorkerDT * count);
        },
        createGL: function(sandbox){
            var gl = glslTool.buildFakeGl(sandbox);

            wdrd.DeviceManagerWorkerData.gl = gl;

            return gl;
        },
        createFakeWorker: function (sandbox) {
            var Worker = function (filePath) {
                this.filePath = filePath;
            }

            Worker.prototype.postMessage = sandbox.stub();

            window.Worker = Worker;
        },
        getRenderWorker: function () {
            return wd.WorkerInstanceData.renderWorker;
        },
        getWorkerPostMessage: function(){
            return window.postMessage;
        },
        execRenderWorkerMessageHandler: function (e) {
            window.onmessage(e);
        }
    }
})()

