var drawRenderCommandBufferTool = (function () {
    return {
        buildFakeRenderCommandBufferData: function(sandbox){
            return {
                buffer: new SharedArrayBuffer(1000),
                count:1000
            }
        },
        resetData: function(){
            wd.initDrawRenderCommandBufferWorkerData(wdrd.DrawRenderCommandBufferWorkerData);
            //
            // var SendDrawRenderCommandBufferData = wd.SendDrawRenderCommandBufferData;
            //
            // SendDrawRenderCommandBufferData.state = wd.ERenderWorkerState.DEFAULT;
        }
    }
})()

