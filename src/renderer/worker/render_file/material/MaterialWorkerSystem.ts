import { Map } from "immutable";
import {
    BasicMaterialInitWorkerData, LightMaterialInitWorkerData, MaterialInitWorkerData,
    MaterialWorkerData
} from "./MaterialWorkerData";
import { material_config } from "../../../data/material_config";
import { shaderLib_generator } from "../../../data/shaderLib_generator";
import { init as initShader } from "../shader/ShaderWorkerSystem";
import {
    createTypeArrays as createTypeArraysUtils,
    getOpacity as getOpacityUtils, getAlphaTest as getAlphaTestUtils,
    isTestAlpha as isTestAlphaUtils,  buildInitShaderDataMap
} from "../../../utils/material/materialUtils";
import { ProgramWorkerData } from "../shader/program/ProgramWorkerData";
import { LocationWorkerData } from "../shader/location/LocationWorkerData";
import { GLSLSenderWorkerData } from "../shader/glslSender/GLSLSenderWorkerData";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import {
    getBasicMaterialBufferCount, getBufferTotalCount,
    getLightMaterialBufferCount
} from "../../../utils/material/bufferUtils";
import { createTypeArrays as createBasicMaterialTypeArraysUtils } from "../../../utils/material/basicMaterialUtils";
import { createTypeArrays as createLightMaterialTypeArraysUtils } from "../../../utils/material/lightMaterialUtils";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import { getColorArr3 as getColorArr3Utils } from "../../../utils/common/operateBufferDataUtils";
import { DirectionLightWorkerData } from "../light/DirectionLightWorkerData";
import { PointLightWorkerData } from "../light/PointLightWorkerData";

export var initMaterials = (basicMaterialData: BasicMaterialInitWorkerData, lightMaterialData: LightMaterialInitWorkerData) => {
    _initSpecifyMaterials(basicMaterialData.startIndex, basicMaterialData.index);
    _initSpecifyMaterials(lightMaterialData.startIndex, lightMaterialData.index);
}

var _initSpecifyMaterials = (startIndex: number, index: number) => {
    for (let i = startIndex; i < index; i++) {
        initMaterial(i, null);
    }
}

export var initMaterial = (materialIndex: number, state: Map<any, any>) => {
    var shaderIndex = getShaderIndex(materialIndex, MaterialWorkerData);

    //todo fix
    // initShader(state, materialIndex, shaderIndex, getMaterialClassNameFromTable(shaderIndex, MaterialWorkerData.materialClassNameTable), material_config, shaderLib_generator as any, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData));
}

export var getShaderIndex = (materialIndex: number, MaterialWorkerData: any) => {
    return MaterialWorkerData.shaderIndices[materialIndex];
}

// export var getShaderIndexFromTable = getShaderIndexFromTableUtils;

export var initNewInitedMaterials = (workerInitList: Array<number>) => {
    for (let index of workerInitList) {
        initMaterial(index, null);
    }
}

export var getColorArr3 = getColorArr3Utils;

export var getOpacity = getOpacityUtils;

export var getAlphaTest = getAlphaTestUtils;

export var isTestAlpha = isTestAlphaUtils;

export var initData = (materialData: MaterialInitWorkerData, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

    //todo fix
    // MaterialWorkerData.materialClassNameTable = materialData.materialClassNameTable;
    // MaterialWorkerData.shaderIndexTable = materialData.shaderIndexTable;
}

var _initBufferData = (buffer: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    var offset = createTypeArraysUtils(buffer, getBufferTotalCount(), MaterialWorkerData);

    offset = createBasicMaterialTypeArraysUtils(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = createLightMaterialTypeArraysUtils(buffer, offset, getLightMaterialBufferCount(), LightMaterialWorkerData);
}
