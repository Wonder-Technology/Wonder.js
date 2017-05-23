var meshRendererTool = (function () {
    return {
        create:wd.createMeshRenderer,

        resetData: function(){
            wd.initMeshRendererData(wd.MeshRendererData);
        }
    }
})()

