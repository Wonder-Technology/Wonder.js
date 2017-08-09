var deferShadingTool = (function () {
    return {
        enableDeferShading: function (sandbox) {
            sandbox.stub(wd.GPUDetector.getInstance(), "extensionColorBufferFloat", true);
        }
    }
})()

