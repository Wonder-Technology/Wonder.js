var materialTool = (function () {
    return {
        getGameObject:wd.getMaterialGameObject,
        initMaterial: wd.initMaterial,

        getShaderIndex: function(materialIndex){
            return wd.getShaderIndex(materialIndex, wd.MaterialData);
        },
        resetData: function(){
            wd.initMaterialData(wd.MaterialData, wd.BasicMaterialData);
        },
        getVsSource: function (gl) {
            return gl.shaderSource.firstCall.args[1];
        },
        getFsSource: function (gl) {
            return gl.shaderSource.secondCall.args[1];
        }
    }
})()

