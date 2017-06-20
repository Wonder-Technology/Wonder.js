import { isBufferExist } from "./bufferUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, getIndices: Function, GeometryWorkerData: any, IndexBufferDataFromSystem: any) => {
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

var _initBuffer = (gl: WebGLRenderingContext, data: Uint16Array | Uint32Array, buffer: WebGLBuffer, IndexBufferDataFromSystem: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl, IndexBufferDataFromSystem);
}

var _resetBindedBuffer = (gl: WebGLRenderingContext, IndexBufferDataFromSystem: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

export var initData = (IndexBufferDataFromSystem: any) => {
    IndexBufferDataFromSystem.buffers = [];
}
