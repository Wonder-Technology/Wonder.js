var MeshRendererSystemTool = YYC.Class({
    Public: {
        getRenderList: wd.getMeshRendererRenderList,
        getGameObject: wd.getMeshRendererGameObject,

        resetData: function(){
            wd.initMeshRendererData(wd.MeshRendererData);
        }

    }
});

var meshRendererSystemTool = new MeshRendererSystemTool();

YYC.Tool.extend.extend(meshRendererSystemTool, meshRendererTool);
