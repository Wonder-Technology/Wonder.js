var gpuDetectTool = (function () {
    return {
        setGPUDetectData: function (extensionName, value) {
            wd.GPUDetectData[extensionName] = value;
        },
        resetData: function () {
           for(var key in wd.GPUDetectData){
               if(wd.GPUDetectData.hasOwnProperty(key)){
                   wd.GPUDetectData[key] = null;
               }
           }
        }
    }
}());
