var bufferTool = (function () {
    return {
        minBufferCount: function(sandbox){
            var DataBufferConfig = wd.DataBufferConfig;
            var render_config = wd.render_config;

            sandbox.stub(DataBufferConfig, "materialDataBufferCount", 50);
            sandbox.stub(DataBufferConfig, "transformDataBufferCount", 50);
            sandbox.stub(DataBufferConfig, "geometryDataBufferCount", 50);
            sandbox.stub(render_config, "renderCommandBufferCount", 50);
        }
    }
})()

