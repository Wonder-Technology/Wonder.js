var materialBufferTool = (function () {
    return {
        getBasicMaterialBufferStartIndex: function () {
            return 0;
        },
        getLightMaterialBufferStartIndex: function () {
            return wd.DataBufferConfig.basicMaterialDataBufferCount;
        }
    }
})()

