import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { Map } from "immutable";
import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
import { InitShaderDataMap } from "../../type/utilsType";
import { getGL } from "../../device/DeviceManagerSystem";
import { getMapCount } from "../../texture/MapManagerSystem";
import {
    initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils
} from "../utils/worker/render_file/shader/shaderUtils";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { IMaterialConfig, MaterialShaderLibConfig } from "../../data/material_config_interface";
import { hasDiffuseMap, hasSpecularMap } from "../../../component/material/LightMaterialSystem";

export var initNoMaterialShader = null;

export var initMaterialShader = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
        initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
    };

    initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderDataMap: InitShaderDataMap) => {
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

// export var dispose = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
//     //todo finish
//
//     // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
//     // deleteVal(shaderIndex, ShaderData.programMap);
//
//
//     // deleteVal(shaderIndex, LocationData.attributeLocationMap);
//     // deleteVal(shaderIndex, LocationData.uniformLocationMap);
//     // deleteVal(shaderIndex, ShaderData.sendAttributeConfigMap);
//     // deleteVal(shaderIndex, ShaderData.sendUniformConfigMap);
//     // deleteVal(shaderIndex, ShaderData.vertexAttribHistory);
//     // deleteVal(shaderIndex, ShaderData.shaderMap);
// }

// var _disposeProgram = (gl:WebGLRenderingContext, program:WebGLProgram) => {
//     gl.deleteProgram(this.glProgram);
// }

// export var initData = (ShaderData: any) => {
//     ShaderData.index = 0;
//     ShaderData.count = 0;
//
//     ShaderData.shaderLibWholeNameMap = createMap();
//     //todo fix render worker
//     ShaderData.shaderIndexMap = createMap();
// }
