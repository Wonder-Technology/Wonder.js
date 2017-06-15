var arrayBufferTool = (function () {
    return {
        setBuffer: function (index, data) {
            wd.ArrayBufferData.buffers[index] = data;
        },
        setBufferData: function (index, data) {
            wd.ArrayBufferData.bufferDataMap[index] = data;
        },
        resetData: function(){
            wd.initArrayBufferData(wd.ArrayBufferData);
        }
    }
})()

