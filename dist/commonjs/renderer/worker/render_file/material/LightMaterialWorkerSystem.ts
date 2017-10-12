import {
    computeLightBufferIndex, getClassName,
    getEmissionColorArr3 as getEmissionColorArr3Utils,
    getLightModel as getLightModelUtils,
    getShading as getShadingUtils,
    getShininess as getShininessUtils,
    getSpecularColorArr3 as getSpecularColorArr3Utils,
    hasDiffuseMap as hasDiffuseMapUtils,
    hasSpecularMap as hasSpecularMapUtils
} from "../../../utils/worker/render_file/material/lightMaterialUtils";
import { Map } from "immutable";
import { initMaterial as initMaterialBase } from "./MaterialWorkerSystem";
import { MaterialWorkerData } from "./MaterialWorkerData";
// import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
// import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
// import { TextureWorkerData } from "../texture/TextureWorkerData";
// import { initMapManager } from "../texture/MapManagerWorkerSystem";
// import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";

export const getSpecularColorArr3 = (index: number, LightMaterialWorkerData: any) => {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const getEmissionColorArr3 = (index: number, LightMaterialWorkerData: any) => {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const getShininess = (index: number, LightMaterialWorkerData: any) => {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const getShading = (index: number, LightMaterialWorkerData: any) => {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const getLightModel = (index: number, LightMaterialWorkerData: any) => {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const hasDiffuseMap = (index: number, LightMaterialWorkerData: any) => {
    return hasDiffuseMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const hasSpecularMap = (index: number, LightMaterialWorkerData: any) => {
    return hasSpecularMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
}

export const initMaterialWithoutInitMap = (index: number, state: Map<any, any>) => {
    initMaterialBase(index, state, getClassName(), MaterialWorkerData);
}

// export const initMaterial = (index: number, state: Map<any, any>) => {
//     initMaterialBase(index, state, getClassName(), MaterialWorkerData);
//
//     initMapManager(getGL(DeviceManagerWorkerData, state), index, MapManagerWorkerData, TextureWorkerData);
// }

export const initData = (LightMaterialWorkerData: any) => {
}
