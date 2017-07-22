import {
    computeLightBufferIndex,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getShading as getShadingUtils,
    getShininess as getShininessUtils, getSpecularColorArr3 as getSpecularColorArr3Utils
} from "../../../utils/material/lightMaterialUtils";

export var getSpecularColorArr3 = (index: number, LightMaterialData: any) => {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
}

export var getEmissionColorArr3 = (index: number, LightMaterialData: any) => {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
}

export var getShininess = (index: number, LightMaterialDataFromSystem: any) => {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var getShading = (index: number, LightMaterialDataFromSystem: any) => {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var getLightModel = (index: number, LightMaterialDataFromSystem: any) => {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
}

export var setDiffuseMapIndex = (textureIndex: number, LightMaterialData: any) => {
    LightMaterialData.diffuseMapIndex = textureIndex;
}

export var setSpecularMapIndex = (textureIndex: number, LightMaterialData: any) => {
    LightMaterialData.specularMapIndex = textureIndex;
}
