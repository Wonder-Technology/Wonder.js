var materialTool = (function () {
    return {
        getGameObject:wd.getMaterialGameObject,

        getShaderIndex: function(materialIndex){
            return wd.getShaderIndex(materialIndex, wd.MaterialData);
        },
        resetData: function(){
            wd.initMaterialData(wd.TextureCacheData, wd.TextureData, wd.MapManagerData, wd.MaterialData, wd.BasicMaterialData, wd.LightMaterialData);
        },
        getVsSource: function (gl) {
            return gl.shaderSource.firstCall.args[1];
        },
        getFsSource: function (gl) {
            return gl.shaderSource.secondCall.args[1];
        }
    }
})()

