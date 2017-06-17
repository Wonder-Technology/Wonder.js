var bufferUtils = (function () {
    return {
        minBufferCount: function(sandbox, data, DataBufferConfig){
            var transformDataBufferCount = 10;
            var geometryDataBufferCount = (data && data.geometryDataBufferCount) || 200;

            testTool.stubGetter(sinon, wd.ThreeDTransformData, "maxCount", function () {
                return transformDataBufferCount;
            });
            sandbox.stub(DataBufferConfig, "transformDataBufferCount", transformDataBufferCount);

            sandbox.stub(DataBufferConfig, "materialDataBufferCount", 10);
            sandbox.stub(DataBufferConfig, "geometryDataBufferCount", geometryDataBufferCount);
            sandbox.stub(DataBufferConfig, "renderCommandBufferCount", 10);
        }
    }
})()

