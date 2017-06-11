import { Map } from "immutable";
import { MaterialInitWorkerData, MaterialWorkerData } from "./MaterialWorkerData";
import { material_config } from "../../data/material_config";
import { shaderLib_generator } from "../../data/shaderLib_generator";
import { init as initShader } from "../shader/ShaderWorkerSystem";
import {
    createBufferViews,
    getColorDataSize, getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils,
    getShaderIndexFromTable as getShaderIndexFromTableUtils, getMaterialClassNameFromTable,
    getColorArr3 as getColorArr3Utils, isTestAlpha as isTestAlphaUtils
} from "../../utils/material/materialUtils";
import { ProgramWorkerData } from "../shader/program/ProgramWorkerData";
import { LocationWorkerData } from "../shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "../shader/glslSender/GLSLSenderWorkerData";
import { DeviceManagerWorkerData } from "../device/DeviceManagerWorkerData";

export var initMaterials = (materialCount:number) => {
    for (let i = 0, count = materialCount; i < count; i++) {
        initMaterial(i, null);
    }
}

// export var initMaterial = (index: number, shaderMap:ShaderMap, state: Map<any, any>) => {
export var initMaterial = (materialIndex: number, state: Map<any, any>) => {
    var shaderIndex = getShaderIndex(materialIndex, MaterialWorkerData);
    //not use isInitMap
    ////todo move isInitMap out?(not contain worker data)
    // isInitMap = ShaderData.isInitMap,
    // shaderIndex = shader.index;

    // if (isInitMap[shaderIndex] === true) {
    //     return;
    // }

    // isInitMap[shaderIndex] = true;

    // initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);

    initShader(state, materialIndex, shaderIndex, getMaterialClassNameFromTable(shaderIndex, MaterialWorkerData.materialClassNameTable), material_config, shaderLib_generator as any, DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, MaterialWorkerData);
}

export var getShaderIndex = (materialIndex: number, MaterialWorkerData:any) => {
    return MaterialWorkerData.shaderIndices[materialIndex];
}

export var getShaderIndexFromTable = getShaderIndexFromTableUtils;

export var initNewInitedMaterials = (workerInitList:Array<number>) => {
    for (let index of workerInitList) {
        initMaterial(index, null);
    }
}

export var getColorArr3 = getColorArr3Utils;

export var getOpacity = getOpacityUtils;

export var getAlphaTest = getAlphaTestUtils;

export var isTestAlpha = isTestAlphaUtils;

export var initData = (materialData:MaterialInitWorkerData, DataBufferConfig:any, MaterialWorkerData:any) => {
    createBufferViews(materialData.buffer, DataBufferConfig.materialDataBufferCount, MaterialWorkerData);

    MaterialWorkerData.materialClassNameTable = materialData.materialClassNameTable;
    MaterialWorkerData.shaderIndexTable = materialData.shaderIndexTable;
}
