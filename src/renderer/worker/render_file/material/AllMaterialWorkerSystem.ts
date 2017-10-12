import { Map } from "immutable";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
import {
    BasicMaterialInitWorkerData,
    LightMaterialInitWorkerData,
    MaterialInitWorkerData,
    MaterialWorkerData
} from "./MaterialWorkerData";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { MapManagerWorkerData } from "../texture/MapManagerWorkerData";
import { BasicMaterialWorkerData } from "./BasicMaterialWorkerData";
import { LightMaterialWorkerData } from "./LightMaterialWorkerData";
import {
    createTypeArrays as createBasicMaterialTypeArraysUtils
} from "../../../utils/worker/render_file/material/basicMaterialUtils";
import {
    createTypeArrays as createLightMaterialTypeArraysUtils
} from "../../../utils/worker/render_file/material/lightMaterialUtils";
import { TextureInitWorkerData } from "../../../type/messageDataType";
import { initData as initLightMaterialData, initMaterialWithoutInitMap as initLightMaterialWithoutInitMap } from "./LightMaterialWorkerSystem";
import { initData as initMapManagerData, initMapManagers } from "../texture/MapManagerWorkerSystem";
import {
    buildInitShaderDataMap,
    createTypeArrays as createTypeArraysUtils,
    initNoMaterialShaders
} from "../../../utils/worker/render_file/material/materialUtils";
import { initMaterialWithoutInitMap as initBasicMaterialWithoutInitMap } from "./BasicMaterialWorkerSystem";
import {
    getBasicMaterialBufferCount, getBufferTotalCount,
    getLightMaterialBufferCount
} from "../../../utils/worker/render_file/material/bufferUtils";

export const initMaterials = (state: Map<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, basicMaterialData: BasicMaterialInitWorkerData, lightMaterialData: LightMaterialInitWorkerData, TextureWorkerData: any, AmbientLightWorkerData: any, DirectionLightWorkerData: any, PointLightWorkerData: any, GPUDetectWorkerData: any, GLSLSenderWorkerData: any, ProgramWorkerData: any, VaoWorkerData: any, LocationWorkerData: any, ShaderWorkerData: any) => {
    initNoMaterialShaders(state, material_config, shaderLib_generator, initNoMaterialShader, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, AmbientLightWorkerData, DirectionLightWorkerData, PointLightWorkerData, GPUDetectWorkerData, VaoWorkerData));

    _initMaterials(state, basicMaterialData.startIndex, basicMaterialData.index, initBasicMaterialWithoutInitMap);
    _initMaterials(state, lightMaterialData.startIndex, lightMaterialData.index, initLightMaterialWithoutInitMap);

    initMapManagers(gl, TextureWorkerData);
}

const _initMaterials = (state: Map<any, any>, startIndex: number, index: number, initSpecifyMaterialWithoutInitMap: Function, ) => {
    for (let i = startIndex; i < index; i++) {
        initSpecifyMaterialWithoutInitMap(i, state);
    }
}

export const initData = (materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData | null, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    _initBufferData(materialData.buffer, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData);

    initLightMaterialData(LightMaterialWorkerData);

    if (textureData !== null) {
        initMapManagerData(textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData);
    }
}

const _initBufferData = (buffer: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => {
    var offset = createTypeArraysUtils(buffer, getBufferTotalCount(), MaterialWorkerData);

    offset = createBasicMaterialTypeArraysUtils(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialWorkerData);
    offset = createLightMaterialTypeArraysUtils(buffer, offset, getLightMaterialBufferCount(), LightMaterialWorkerData);
}