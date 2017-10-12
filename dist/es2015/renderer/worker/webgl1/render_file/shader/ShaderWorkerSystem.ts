import { Map } from "immutable";
import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../../../data/material_config_interface";
import { IWebGL1ShaderLibContentGenerator } from "../../both_file/data/shaderLib_generator";
import {
    bindIndexBuffer as bindIndexBufferUtils, initData as initDataUtils,
    initMaterialShader as initMaterialShaderUtils,
    initNoMaterialShader as initNoMaterialShaderUtils
} from "../../../../webgl1/utils/worker/render_file/shader/shaderUtils";
import { buildGLSLSource } from "./ShaderSourceBuildWorkerSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../../render_file/material/LightMaterialWorkerSystem";
import {
    getIndices, getNormals, getTexCoords,
    getVertices
} from "../../../render_file/geometry/GeometryWorkerSystem";

export const initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

export const initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

const _buildInitShaderFuncDataMap =() => {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount,
        hasSpecularMap: hasSpecularMap,
        hasDiffuseMap: hasDiffuseMap,

        getVertices: getVertices,
        getNormals: getNormals,
        getTexCoords: getTexCoords,
        getIndices: getIndices
    }
}

export const bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramWorkerData: any, GeometryWorkerData: any, IndexBufferWorkerData: any) => {
    bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
}

export const initData = initDataUtils;
