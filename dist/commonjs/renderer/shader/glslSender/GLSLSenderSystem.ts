import {
    sendBuffer as sendBufferUtils,
    sendFloat1 as sendFloat1Utils, sendFloat3 as sendFloat3Utils, sendInt as sendIntUtils, sendMatrix3 as sendMatrix3Utils, sendMatrix4 as sendMatrix4Utils,
    sendVector3 as sendVector3Utils
} from "../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { UniformCacheMap, UniformShaderLocationMap } from "../../type/dataType";
import { getUniformLocation, isUniformLocationNotExist } from "../location/LocationSystem";
import { Vector3 } from "../../../math/Vector3";

export const sendBuffer = sendBufferUtils;

export const sendMatrix3 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    sendMatrix3Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export const sendMatrix4 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    sendMatrix4Utils(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export const sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Vector3, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendVector3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export const sendInt = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendIntUtils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export const sendFloat1 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendFloat1Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export const sendFloat3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Array<number>, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendFloat3Utils(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
