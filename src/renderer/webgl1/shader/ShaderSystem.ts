// export var getNoMaterialShaderIndex = (shaderName: string, ShaderData: any) => {
//     return ShaderData.shaderIndexMap[shaderName];
// }

import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { Map } from "immutable";
import { IWebGL1ShaderLibContentGenerator } from "../data/shaderLib_generator";
import { InitShaderDataMap } from "../../type/utilsType";
import { getGL } from "../../device/DeviceManagerSystem";
import { getMapCount } from "../../texture/MapManagerSystem";
import { hasDiffuseMap, hasSpecularMap } from "../../utils/material/lightMaterialUtils";
import { initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils } from "../utils/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../data/material_config";

export var initNoMaterialShader = null;

export var initMaterialShader = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
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
}
