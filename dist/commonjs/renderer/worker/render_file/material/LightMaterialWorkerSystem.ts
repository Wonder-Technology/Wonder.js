import {
    computeLightBufferIndex,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getShading as getShadingUtils,
    getShininess as getShininessUtils, getSpecularColorArr3 as getSpecularColorArr3Utils, hasDiffuseMap as hasDiffuseMapUtils, hasSpecularMap as hasSpecularMapUtils
} from "../../../utils/worker/render_file/material/lightMaterialUtils";

export var getSpecularColorArr3 = (index: number, LightMaterialWorkerData: any) => {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var getEmissionColorArr3 = (index: number, LightMaterialWorkerData: any) => {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var getShininess = (index: number, LightMaterialWorkerData: any) => {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var getShading = (index: number, LightMaterialWorkerData: any) => {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var getLightModel = (index: number, LightMaterialWorkerData: any) => {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var hasDiffuseMap = (index: number, LightMaterialWorkerData: any) => {
    return hasDiffuseMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var hasSpecularMap = (index: number, LightMaterialWorkerData: any) => {
    return hasSpecularMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export var initData = (LightMaterialWorkerData: any) => {
}
