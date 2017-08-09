var deferShadingWorkerTool = (function () {
    return {
        enableDeferShading: function (sandbox) {
            sandbox.stub(wdrd.GPUDetector.getInstance(), "extensionColorBufferFloat", true);
        }
    }
})()

