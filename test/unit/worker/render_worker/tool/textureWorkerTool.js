var textureWorkerTool = (function () {
    return {
        update: function(gl, textureIndex, TextureWorkerData){
            wd.updateTextureWorker(gl, textureIndex, TextureWorkerData);
        }
        // setSource: function(textureIndex, source, TextureWorkerData){
        //     if(TextureWorkerData.sourceMap === null){
        //         TextureWorkerData.sourceMap = [];
        //     }
        //
        //     TextureWorkerData.sourceMap[textureIndex] = source;
        // }
    }
}());

