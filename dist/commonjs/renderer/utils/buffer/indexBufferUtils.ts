import { isBufferExist } from "./bufferUtils";

export const getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, getIndices: Function, GeometryWorkerData: any, IndexBufferDataFromSystem: any) => {
    var buffers = IndexBufferDataFromSystem.buffers,
        buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        return buffer;
    }

    buffer = gl.createBuffer();

    buffers[geometryIndex] = buffer;

    _initBuffer(gl, getIndices(geometryIndex, GeometryWorkerData), buffer, IndexBufferDataFromSystem);

    return buffer;
}

const _initBuffer =(gl: WebGLRenderingContext, data: Uint16Array | Uint32Array, buffer: WebGLBuffer, IndexBufferDataFromSystem: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl, IndexBufferDataFromSystem);
}

const _resetBindedBuffer =(gl: WebGLRenderingContext, IndexBufferDataFromSystem: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

export const initData = (IndexBufferDataFromSystem: any) => {
    IndexBufferDataFromSystem.buffers = [];
}
