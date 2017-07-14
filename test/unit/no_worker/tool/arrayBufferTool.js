var arrayBufferTool = (function () {
    return {
        setVerticeBuffer: function (index, data) {
            wd.ArrayBufferData.verticeBuffers[index] = data;
        },
        setNormalBuffer: function (index, data) {
            wd.ArrayBufferData.normalBuffers[index] = data;
        },
        resetData: function(){
            wd.initArrayBufferData(wd.ArrayBufferData);
        }
    }
})()

