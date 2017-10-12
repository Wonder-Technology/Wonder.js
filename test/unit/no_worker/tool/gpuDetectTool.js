var gpuDetectTool = (function () {
    return {
        setGPUDetectData: function (extensionName, value) {
            wd.GPUDetectData[extensionName] = value;
        }
        // resetData: function () {
        //     wd.initWebGL1DetectData(wd.GPUDetectData):
        // }
    }
}());
