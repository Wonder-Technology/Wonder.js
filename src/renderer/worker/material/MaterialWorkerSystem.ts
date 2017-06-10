import { Map } from "immutable";
import { DeviceManagerData } from "../../../device/DeviceManagerData";
import { ProgramData } from "../../shader/program/ProgramData";
import { LocationData } from "../../shader/location/LocationData";
import { GLSLSenderData } from "../../shader/glslSender/GLSLSenderData";
import { MaterialInitWorkerData, MaterialWorkerData } from "./MaterialWorkerData";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { IMaterialConfig, material_config } from "../../data/material_config";
import { IShaderLibGenerator, shaderLib_generator } from "../../data/shaderLib_generator";
import { MaterialClassNameTable } from "../../../definition/type/materialType";
import { expect } from "wonder-expect.js";
import { init as initShader } from "./ShaderWorkerSystem";
import {
    createBufferViews,
    getColorDataSize,
    getShaderIndexFromTable as getShaderIndexFromTableUtils
} from "../../../utils/materialUtils";
import { Vector3 } from "../../../math/Vector3";

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

    initShader(state, materialIndex, shaderIndex, _getMaterialClassNameFromTable(shaderIndex, MaterialWorkerData.materialClassNameTable), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);
}

var _getMaterialClassNameFromTable = (shaderIndex:number, materialClassNameTable:MaterialClassNameTable) => {
    return materialClassNameTable[shaderIndex]
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

export var getColorArr3 = (materialIndex: number, MaterialWorkerData: any) => {
    var colors = MaterialWorkerData.colors,
        size = getColorDataSize(),
        index = materialIndex * size;

    return [colors[index], colors[index + 1],colors[index + 2]];
}

export var initData = (materialData:MaterialInitWorkerData, DataBufferConfig:any, MaterialWorkerData:any) => {
    createBufferViews(materialData.buffer, DataBufferConfig.materialDataBufferCount, MaterialWorkerData);

    MaterialWorkerData.materialClassNameTable = materialData.materialClassNameTable;
    MaterialWorkerData.shaderIndexTable = materialData.shaderIndexTable;
}
