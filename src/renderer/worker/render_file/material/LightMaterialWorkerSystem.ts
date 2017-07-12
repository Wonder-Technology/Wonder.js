import {
    computeLightBufferIndex,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getShading as getShadingUtils,
    getShininess as getShininessUtils
} from "../../../utils/material/lightMaterialUtils";

export var getSpecularColorArr3 = (index: number, LightMaterialData: any) => {
    return getSpecularColorArr3(computeLightBufferIndex(index), LightMaterialData);
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
