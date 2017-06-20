import { Shader } from "./Shader";
import { createMap, isValidMapValue } from "../../utils/objectUtils";
import { getShaderIndexFromTable } from "../../component/material/MaterialSystem";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import {
    bindIndexBuffer as bindIndexBufferUtils, init as initUtils, sendAttributeData as sendAttributeDataUtils, sendUniformData as sendUniformDataUtils,
    use as useUtils
} from "../utils/shader/shaderUtils";
import { getIndices, getVertices } from "../../component/geometry/GeometrySystem";
import { getAttribLocation, isAttributeLocationNotExist } from "./location/LocationSystem";
import { getUniformData, sendBuffer, sendFloat1, sendMatrix4, sendVector3 } from "./glslSender/GLSLSenderSystem";
import { RenderCommandUniformData } from "../type/dataType";
import { buildGLSLSource } from "./shaderSourceBuildSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { IMaterialConfig } from "../data/material_config";
import { IShaderLibGenerator } from "../data/shaderLib_generator";
import { Map } from "immutable";

export var create = (materialClassName: string, MaterialData: any, ShaderData: any) => {
    var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable),
        shader = ShaderData.shaderMap[index];

    if (_isShaderExist(shader)) {
        return shader;
    }

    shader = new Shader();

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

var _isShaderExist = (shader: Shader) => isValidMapValue(shader);

export var init = null;

export var sendAttributeData = null;

export var sendUniformData = null;

export var bindIndexBuffer = null;

export var use = null;

if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
    init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DeviceManagerData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, MaterialData: any) => {
        initUtils(state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, buildGLSLSource, getGL, DeviceManagerData, ProgramData, LocationData, GLSLSenderData, MaterialData);
    };

    sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData: any, LocationData: any, GLSLSenderData: any, GeometryData: any, ArrayBufferData: any) => sendAttributeDataUtils(gl, shaderIndex, geometryIndex, getVertices, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);

    sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, MaterialData: any, ProgramData: any, LocationData: any, GLSLSenderData: any, renderCommandUniformData: RenderCommandUniformData) => {
        sendUniformDataUtils(gl, shaderIndex, {
            getUniformData: getUniformData,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendFloat1: sendFloat1
        }, MaterialData, ProgramData, LocationData, GLSLSenderData, renderCommandUniformData);
    };

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

    ShaderData.shaderMap = createMap();
}
