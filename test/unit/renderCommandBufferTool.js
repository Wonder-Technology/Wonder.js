var renderCommandBufferTool = (function () {
    // var _isInitData = false;
    //
    // var _cleanTypeArr = function(typeArr){
    //     if(!typeArr){
    //         return;
    //     }
    //
    //     for(var i = 0, len = typeArr.length; i < len; i++){
    //         typeArr[i] = 0;
    //     }
    // }
    //
    // var _initDataOnluOnce = function () {
    //     if(_isInitData){
    //         return;
    //     }
    //
    //     wd.initRenderCommandBufferData(wd.render_config, wd.RenderCommandBufferData);
    //
    //     _isInitData = true;
    // }

    return {
        resetData: function(){
            // var RenderCommandBufferData = wd.RenderCommandBufferData;
            //
            // _initDataOnluOnce();
            //
            // _cleanTypeArr(RenderCommandBufferData.mMatrices);
            // _cleanTypeArr(RenderCommandBufferData.vMatrices);
            // _cleanTypeArr(RenderCommandBufferData.pMatrices);
            // _cleanTypeArr(RenderCommandBufferData.materialIndices);
            // _cleanTypeArr(RenderCommandBufferData.shaderIndices);
            // _cleanTypeArr(RenderCommandBufferData.geometryIndices);

            wd.initRenderCommandBufferData(wd.render_config, wd.RenderCommandBufferData);
        }
    }
})()
