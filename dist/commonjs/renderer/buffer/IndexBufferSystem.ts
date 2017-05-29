import { getIndexType, getIndexTypeSize, getIndices } from "../../component/geometry/GeometrySystem";
import { isBufferExist } from "./bufferUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, GeometryData: any, IndexBufferData: any) => {
    var buffers = IndexBufferData.buffers,
        buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        return buffer;
    }

    buffer = gl.createBuffer();

    buffers[geometryIndex] = buffer;

    _initBuffer(gl, getIndices(geometryIndex, GeometryData), buffer, IndexBufferData);

    return buffer;
}

var _initBuffer = (gl: WebGLRenderingContext, data: Uint16Array | Uint32Array, buffer: WebGLBuffer, IndexBufferData: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl, IndexBufferData);
}

var _resetBindedBuffer = (gl: WebGLRenderingContext, IndexBufferData: any) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

export var getType = (GeometryData: any) => {
    return getIndexType(GeometryData);
}

export var getTypeSize = (GeometryData: any) => {
    return getIndexTypeSize(GeometryData);
}

export var initData = (IndexBufferData: any) => {
    IndexBufferData.buffers = [];
}
