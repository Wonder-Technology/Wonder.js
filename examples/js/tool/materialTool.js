var materialTool = (function () {
    return {
        getColor:wd.getMaterialColor,
        setColor:wd.setMaterialColor,
        getOpacity:wd.getMaterialOpacity,
        setOpacity:wd.setMaterialOpacity,
        getGameObject:wd.getMaterialGameObject,
        getAlphaTest: wd.getMaterialAlphaTest,
        setAlphaTest: wd.setMaterialAlphaTest,
        initMaterial: wd.initMaterial,

        getShaderIndex: function(materialIndex){
            return wd.getShaderIndex(materialIndex, wd.MaterialData);
        },
        resetData: function(){
            wd.initMaterialData(wd.MaterialData);
        },
        getVsSource: function (gl) {
            return gl.shaderSource.firstCall.args[1];
        },
        getFsSource: function (gl) {
            return gl.shaderSource.secondCall.args[1];
        }
    }
})()

