var indexBufferTool = (function () {
    return {
        setBuffer: function (index, data) {
            wd.IndexBufferData.buffers[index] = data;
        },
        resetData: function(){
            wd.initIndexBufferData(wd.IndexBufferData);
        }
    }
})()

