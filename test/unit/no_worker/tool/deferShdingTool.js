var deferShadingTool = (function () {
    return {
        enableDeferShading: function (sandbox) {
            gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", true)
        },
        disableDeferShading: function (sandbox) {
            gpuDetectTool.setGPUDetectData("extensionColorBufferFloat", false)
        },
        useDeferShading: function (sandbox) {
            deferShadingTool.enableDeferShading(sandbox);
        }
    }
})()

