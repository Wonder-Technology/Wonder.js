var lightMaterialTool = (function () {
    return {
        create:wd.createLightMaterial,
        initMaterial: wd.initLightMaterial,
        setColor:wd.setLightMaterialColor,
        setOpacity: wd.setLightMaterialOpacity,
        getOpacity: wd.getLightMaterialOpacity,
        setAlphaTest: wd.setLightMaterialAlphaTest,
        getAlphaTest: wd.getLightMaterialAlphaTest,
        setSpecularColor: wd.setLightMaterialSpecularColor,
        getSpecularColor: wd.getLightMaterialSpecularColor,
        setEmissionColor: wd.setLightMaterialEmissionColor,
        getEmissionColor: wd.getLightMaterialEmissionColor,
        setShininess: wd.setLightMaterialShininess,
        getShininess: wd.getLightMaterialShininess,
        setShading: wd.setLightMaterialShading,
        getShading: wd.getLightMaterialShading,
        setLightModel: wd.setLightMaterialLightModel,
        getLightModel: wd.getLightMaterialLightModel,
        setDiffuseMap: wd.setLightMaterialDiffuseMap,
        setSpecularMap: wd.setLightMaterialSpecularMap,

        computeLightBufferIndex :function(index) {
            return index - wd.DataBufferConfig.basicMaterialDataBufferCount;
        }
    }
})()

