var deferShadingWorkerTool = (function () {
    return {
        enableDeferShading: function (sandbox) {
            gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", true)
        }
    }
})()

