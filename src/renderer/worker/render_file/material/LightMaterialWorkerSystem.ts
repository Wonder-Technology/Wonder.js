import {
    computeLightBufferIndex,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils, getShading as getShadingUtils,
    getShininess as getShininessUtils, getSpecularColorArr3 as getSpecularColorArr3Utils
} from "../../../utils/material/lightMaterialUtils";

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

export var setDiffuseMapMap = (map:Array<number>, LightMaterialWorkerData: any) => {
    LightMaterialWorkerData.diffuseMapMap = map;
}

export var setSpecularMapMap = (map:Array<number>, LightMaterialWorkerData: any) => {
    LightMaterialWorkerData.specularMapMap = map;
}

export var initData = (LightMaterialWorkerData: any) => {
    LightMaterialWorkerData.diffuseMapMap = [];
    LightMaterialWorkerData.specularMapMap = [];
}
