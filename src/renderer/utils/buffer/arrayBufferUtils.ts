import { isBufferExist } from "./bufferUtils";

export const getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, buffers: Array<WebGLBuffer>, getDatas: Function, GeometryDataFromSystem: any) => {
    var buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        return buffer;
    }

    buffer = gl.createBuffer();

    buffers[geometryIndex] = buffer;

    _initBuffer(gl, getDatas(geometryIndex, GeometryDataFromSystem), buffer);

    return buffer;
}

const _initBuffer = (gl: WebGLRenderingContext, data: Float32Array, buffer: WebGLBuffer) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl);
}

const _resetBindedBuffer = (gl: WebGLRenderingContext) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export const initData = (ArrayBufferDataFromSystemFromSystem: any) => {
    ArrayBufferDataFromSystemFromSystem.vertexBuffers = [];
    ArrayBufferDataFromSystemFromSystem.normalBuffers = [];
    ArrayBufferDataFromSystemFromSystem.texCoordBuffers = [];
}
