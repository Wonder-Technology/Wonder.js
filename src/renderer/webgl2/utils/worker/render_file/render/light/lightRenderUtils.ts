export var buildLightMaterialDataForGetUniformData = (getEmissionColorArr3:Function, getSpecularColorArr3:Function, getLightModel:Function, getShininess:Function, LightMaterialDataFromSystem:any) => {
    return {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem
    }
}
