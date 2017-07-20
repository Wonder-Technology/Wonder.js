var materialWorkerTool = (function () {
    return {
        buildSendInitMaterialData: function () {
            var MaterialData = wd.MaterialData;
            var BasicMaterialData = wd.BasicMaterialData;
            var LightMaterialData = wd.LightMaterialData;

            var materialDataBuffer = MaterialData.buffer;

            return {
                buffer: materialDataBuffer,
                basicMaterialData: {
                    startIndex: materialBufferTool.getBasicMaterialBufferStartIndex(),
                    index: BasicMaterialData.index
                },
                lightMaterialData: {
                    startIndex: materialBufferTool.getLightMaterialBufferStartIndex(),
                    index: LightMaterialData.index
                }
            }
        },
        resetData: function(){
            // wd.initMaterialWorkerData(wd.TextureCacheData, wd.TextureData, wd.MapManagerData, wd.MaterialData, wd.BasicMaterialData, wd.LightMaterialData);

            var TextureWorkerData = wdrd.TextureWorkerData;

            TextureWorkerData.index = 0;

            TextureWorkerData.glTextures = [];

            TextureWorkerData.sourceMap = [];
        }
    }
})()

