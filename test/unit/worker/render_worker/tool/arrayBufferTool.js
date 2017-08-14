var arrayBufferTool = (function () {
    return {
        setVerticeBuffer: function (index, data) {
            wd.ArrayBufferData.vertexBuffer[index] = data;
        },
        setNormalBuffer: function (index, data) {
            wd.ArrayBufferData.normalBuffers[index] = data;
        },
        setTexCoordBuffer: function (index, data) {
            wd.ArrayBufferData.texCoordBuffers[index] = data;
        },
        resetData: function(){
            // wd.initArrayBufferData(wd.ArrayBufferData);
        }
    }
})()

