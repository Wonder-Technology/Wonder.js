import { Map } from "immutable";
import { getGL } from "../../../both_file/device/DeviceManagerWorkerSystem";
import { InitShaderDataMap } from "../../../../type/utilsType";
import { getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../../../data/material_config";
import { IWebGL1ShaderLibContentGenerator } from "../../both_file/data/shaderLib_generator";
import {
    initMaterialShader as initMaterialShaderUtils,
    initNoMaterialShader as initNoMaterialShaderUtils
} from "../../../../webgl1/utils/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildWorkerSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../../render_file/material/LightMaterialWorkerSystem";

export var initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

export var initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};

var _buildInitShaderFuncDataMap = () => {
    return {
        buildGLSLSource: buildGLSLSource,
        getGL: getGL,
        getMapCount: getMapCount,
        hasSpecularMap: hasSpecularMap,
        hasDiffuseMap: hasDiffuseMap
    }
}
