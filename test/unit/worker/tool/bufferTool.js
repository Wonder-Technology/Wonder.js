var bufferTool = (function () {
    return {
        minBufferCount: function(sandbox, data){
            bufferUtils.minBufferCount(sandbox, data, wd.DataBufferConfig);
            bufferUtils.minBufferCount(sandbox, data, wdrd.DataBufferConfig);
        }
    }
})()

