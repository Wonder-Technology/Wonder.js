var gpuDetectTool = (function () {
    return {
        setGPUDetectData: function (extensionName, value) {
            wdrd.GPUDetectWorkerData[extensionName] = value;
        },
        resetData: function () {
            var GPUDetectWorkerData = wdrd.GPUDetectWorkerData;

            for(var key in GPUDetectWorkerData){
                if(GPUDetectWorkerData.hasOwnProperty(key)){
                    GPUDetectWorkerData[key] = null;
                }
            }
        }
    }
}());
