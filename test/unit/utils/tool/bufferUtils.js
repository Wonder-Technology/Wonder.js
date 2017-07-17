var bufferUtils = (function () {
    return {
        minBufferCount: function(sandbox, data, DataBufferConfig){
            var transformDataBufferCount = (data && data.transformDataBufferCount) || 10;
            var geometryDataBufferCount = (data && data.geometryDataBufferCount) || 200;

            testTool.stubGetter(sinon, wd.ThreeDTransformData, "maxCount", function () {
                return transformDataBufferCount;
            });
            sandbox.stub(DataBufferConfig, "transformDataBufferCount", transformDataBufferCount);

            sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 10);
            sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 10);

            sandbox.stub(DataBufferConfig, "textureDataBufferCount", 10);

            sandbox.stub(DataBufferConfig, "geometryDataBufferCount", geometryDataBufferCount);
            sandbox.stub(DataBufferConfig, "renderCommandBufferCount", 10);
        }
    }
})()

