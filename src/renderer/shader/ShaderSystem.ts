import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import {
    bindIndexBuffer as bindIndexBufferUtils,
    // initNoMaterialShader as initNoMaterialShaderUtils, initMaterialShader as initMaterialShaderUtils,
    sendAttributeData as sendAttributeDataUtils,
    use as useUtils
} from "../utils/shader/shaderUtils";
import { getIndices, getNormals, getTexCoords, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { sendBuffer } from "./glslSender/GLSLSenderSystem";
// import { buildGLSLSource } from "./shaderSourceBuildSystem";
// import { getGL } from "../device/DeviceManagerSystem";
// import { IMaterialConfig, MaterialShaderLibConfig } from "../webgl1/data/material_config";
// import { IShaderLibGenerator } from "../data/shaderLib_generator";
// import { Map } from "immutable";
import { DrawDataMap } from "../type/utilsType";
// import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
// import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../component/light/AmbientLightSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    getPosition as getDirectionLightPosition,
} from "../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../component/light/PointLightSystem";
// import { getMapCount } from "../texture/MapManagerSystem";
import { createMap } from "../../utils/objectUtils";
// import { hasDiffuseMap, hasSpecularMap } from "../utils/material/lightMaterialUtils";

// export var create = (materialClassName: string, MaterialData: any, ShaderData: any) => {
export var create = (ShaderData: any) => {
    // var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable),
    // var shader = ShaderData.shaderMap[index];

    // if (_isShaderExist(shader)) {
    //     return shader;
    // }

    // var shader = new Shader();

    // shader.index = index;

    ShaderData.count += 1;

    // return shader;
}

// var _isShaderExist = (shader: Shader) => isValidMapValue(shader);

// export var initNoMaterialShader = null;
//
// export var initMaterialShader = null;

export var sendAttributeData = null;

// export var sendUniformData = null;

export var bindIndexBuffer = null;

export var use = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    // initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, addSendAttributeConfig:Function, addSendUniformConfig:Function, initShaderDataMap: InitShaderDataMap) => {
    //     initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, addSendAttributeConfig, addSendUniformConfig, _buildInitShaderFuncDataMap(), initShaderDataMap);
    // };
    //
    // initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, addSendAttributeConfig:Function, addSendUniformConfig:Function, initShaderDataMap: InitShaderDataMap) => {
    //     return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, addSendAttributeConfig, addSendUniformConfig, _buildInitShaderFuncDataMap(), initShaderDataMap);
    // };

    // var _buildInitShaderFuncDataMap = () => {
    //     return {
    //         buildGLSLSource: buildGLSLSource,
    //         getGL: getGL,
    //         getMapCount: getMapCount,
    //         hasSpecularMap: hasSpecularMap,
    //         hasDiffuseMap: hasDiffuseMap
    //     }
    // }

    sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, program, geometryIndex, {
        getVertices: getVertices,
        getNormals: getNormals,
        getTexCoords: getTexCoords
    }, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);

    bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, ProgramData: any, GeometryData: any, IndexBufferData: any) => {
        bindIndexBufferUtils(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
    }

    use = useUtils;
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

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.shaderIndexByMaterialIndexAndShaderNameMap = createMap();
}
