var bufferTool = (function () {
    return {
        minBufferCount: function(sandbox, data){
            var DataBufferConfig = wd.DataBufferConfig;
            var render_config = wd.render_config;

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

