var bufferTool = (function () {
    return {
        minBufferCount: function(sandbox, data){
            bufferUtils.minBufferCount(sandbox, data, wd.DataBufferConfig);
        },
        makeCreateDifferentBuffer: function (gl) {
            var buffer = null;

            for(var i = 0; i < 1000; i++){
                buffer = {i:i};

                gl.createBuffer.onCall(i).returns(buffer);
            }
        }
    }
})()

