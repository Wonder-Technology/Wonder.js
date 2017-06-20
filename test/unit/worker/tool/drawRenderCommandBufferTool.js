var drawRenderCommandBufferTool = (function () {
    return {
        resetData: function(){
            drawRenderCommandBufferUtils.resetData();

            var SendDrawRenderCommandBufferData = wd.SendDrawRenderCommandBufferData;

            SendDrawRenderCommandBufferData.state = wd.ERenderWorkerState.DEFAULT;
        }
    }
})()

