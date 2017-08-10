var deferShadingTool = (function () {
    return {
        enableDeferShading: function (sandbox) {
            gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", true)
        }
    }
})()

