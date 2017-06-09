import { Map } from "immutable";
import { DeviceManagerData } from "../../../device/DeviceManagerData";
import { ProgramData } from "../../shader/program/ProgramData";
import { LocationData } from "../../shader/location/LocationData";
import { GLSLSenderData } from "../../shader/glslSender/GLSLSenderData";
import { MaterialWorkerData } from "./MaterialWorkerData";
import { requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { init as initShader } from "../../shader/ShaderSystem";
import { IMaterialConfig, material_config } from "../../data/material_config";
import { IShaderLibGenerator, shaderLib_generator } from "../../data/shaderLib_generator";

export var initMaterials = (materialCount:number) => {
    for (let i = 0, count = materialCount; i < count; i++) {
        initMaterial(i, null);
    }
}

// export var initMaterial = (index: number, shaderMap:ShaderMap, state: Map<any, any>) => {
export var initMaterial = (index: number, state: Map<any, any>) => {
    var shaderIndex = getShaderIndex(index, MaterialWorkerData);
    //not use isInitMap
    ////todo move isInitMap out?(not contain worker data)
    // isInitMap = ShaderData.isInitMap,
    // shaderIndex = shader.index;

    // if (isInitMap[shaderIndex] === true) {
    //     return;
    // }

    // isInitMap[shaderIndex] = true;

    // initShader(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);
    //todo restore materialClassName

    initShader(state, index, shaderIndex, "BasicMaterial", material_config, shaderLib_generator as any, DeviceManagerData, ProgramData, LocationData, GLSLSenderData);
}

export var getShaderIndex = (materialIndex: number, MaterialWorkerData:any) => {
    return MaterialWorkerData.shaderIndices[materialIndex];
}

export var initNewInitedMaterials = (workerInitList:Array<number>) => {
    for (let index of workerInitList) {
        initMaterial(index, null);
    }
}

export var initData = (buffer:SharedArrayBuffer, DataBufferConfig:any, MaterialWorkerData:any) => {
    MaterialWorkerData.shaderIndices = new Uint32Array(buffer, 0, DataBufferConfig.materialDataBufferCount);
}
