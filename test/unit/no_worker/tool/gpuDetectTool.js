var gpuDetectTool = (function () {
    return {
        setGPUDetectData: function (extensionName, value) {
            wd.GPUDetectData[extensionName] = value;
        }
    }
}());
