var workerTool = (function () {
    // var renderWorkerDT = 33;

    return {
        runRender: function (time) {
            wd.SendDrawRenderCommandBufferData.state = wdrd.ERenderWorkerState.DEFAULT;
            // directorTool.loopBody(null, renderWorkerDT * count);
            directorTool.loopBody(null, time);
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

