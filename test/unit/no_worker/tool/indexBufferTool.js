var indexBufferTool = (function () {
    return {
        setBuffer: function (index, data) {
            wd.IndexBufferData.buffers[index] = data;
        },
        setBuffers: function (buffers) {
            wd.IndexBufferData.buffers = buffers;
        },
        resetData: function(){
            wd.initIndexBufferData(wd.IndexBufferData);
        }
    }
})()

