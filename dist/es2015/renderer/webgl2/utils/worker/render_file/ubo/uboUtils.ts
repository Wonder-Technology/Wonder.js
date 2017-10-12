import { TypeArr } from "../../../../../type/dataType";

export const bindUniformBlock = (gl: any, program: WebGLProgram, blockName: string, bindingPoint: number) => {
    var uniformLocation = gl.getUniformBlockIndex(program, blockName);

    gl.uniformBlockBinding(program, uniformLocation, bindingPoint);
}

export const bindUniformBufferBase = (gl: any, buffer: WebGLBuffer, bindingPoint: number) => {
    gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buffer);
}

export const bufferStaticData = (gl: any, data: TypeArr) => {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
}

export const bufferDynamicData = (gl: any, data: TypeArr) => {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.DYNAMIC_DRAW);
}

export const bufferSubDynamicData = (gl: any, offset: number, data: TypeArr) => {
    gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
}

