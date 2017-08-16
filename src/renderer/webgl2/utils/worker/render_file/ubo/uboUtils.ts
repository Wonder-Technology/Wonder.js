import { TypeArr } from "../../../../../type/dataType";

export var bindUniformBlock = (gl: any, program: WebGLProgram, blockName: string, bindingPoint: number) => {
    var uniformLocation = gl.getUniformBlockIndex(program, blockName);

    gl.uniformBlockBinding(program, uniformLocation, bindingPoint);
}

export var bindUniformBufferBase = (gl:any, buffer: WebGLBuffer, bindingPoint: number) => {
    gl.bindBufferBase(gl.UNIFORM_BUFFER, bindingPoint, buffer);
}

export var bufferStaticData = (gl:any, data:TypeArr) => {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
}

export var bufferDynamicData = (gl:any, data:TypeArr) => {
    gl.bufferData(gl.UNIFORM_BUFFER, data, gl.DYNAMIC_DRAW);
}

export var bufferSubDynamicData = (gl:any, offset:number, data:TypeArr) => {
    gl.bufferSubData(gl.UNIFORM_BUFFER, offset, data);
}

