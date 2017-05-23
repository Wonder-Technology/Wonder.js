var meshRendererTool = (function () {
    return {
        create:wd.createMeshRenderer,
        getRenderList: wd.getMeshRendererRenderList,
        getGameObject: wd.getMeshRendererGameObject,

        resetData: function(){
            wd.initMeshRendererData(wd.MeshRendererData);
        }
    }
})()

