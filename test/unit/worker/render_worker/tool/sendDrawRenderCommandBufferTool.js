var sendDrawRendercommandBufferTool = (function () {
    return {
        markInitComplete: function(){
            wd.SendDrawRenderCommandBufferData.isInitComplete = true;
        },
        resetData: function () {
            wd.initSendDrawRenderCommandBufferData(wd.SendDrawRenderCommandBufferData);
        }
    }
})();

