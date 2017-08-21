import { use as useProgram } from "./program/programUtils";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { WebGLVertexArrayObject } from "../../../../extend/interface";
import { isValidVal } from "../../../../../utils/arrayUtils";

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    return useProgram(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
}

export var getVao = (geometryIndex: number, vaos: Array<WebGLVertexArrayObject>) => {
    return vaos[geometryIndex];
}

export var isVaoExist = (vao: WebGLVertexArrayObject) => isValidVal(vao);

export var createAndInitArrayBuffer = requireCheckFunc((gl: WebGLRenderingContext, data: Float32Array, location: number, size) => {
    it("location should be defined", () => {
        expect(location).exist;
    });
}, (gl: WebGLRenderingContext, data: Float32Array, location: number, size) => {
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(location);

    return buffer;
})

export var createAndInitIndexBuffer = (gl: WebGLRenderingContext, data: Uint16Array | Uint32Array) => {
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return buffer;
}

