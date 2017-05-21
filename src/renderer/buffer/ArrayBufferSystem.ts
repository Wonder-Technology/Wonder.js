import { isValidMapValue } from "../../utils/objectUtils";
import { getVertices } from "../../component/geometry/GeometrySystem";
import { EBufferType } from "../enum/EBufferType";
import { ArrayBufferData } from "./ArrayBufferData";

export var getOrCreateBuffer = (gl:WebGLRenderingContext, geometryIndex:number, bufferType:string, GeometryData:any, ArrayBufferData:any) => {
    var buffer = ArrayBufferData.buffers[geometryIndex];

    if(_isBufferExist(buffer)){
        return buffer;
    }

    buffer = gl.createBuffer();

    _initBuffer(gl, getVertices(geometryIndex, GeometryData), buffer, ArrayBufferData);

    ArrayBufferData.bufferDataMap[geometryIndex] = {
        size:3,
        type:EBufferType.FLOAT
    };

    return buffer;
}

var _isBufferExist = (buffer:WebGLBuffer) => isValidMapValue(buffer);

var _initBuffer = (gl:WebGLRenderingContext, data: Float32Array, buffer:WebGLBuffer, ArrayBufferData:any) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl, ArrayBufferData);
}

var _resetBindedBuffer = (gl:WebGLRenderingContext, ArrayBufferData:any) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    ArrayBufferData.lastBindedArrayBuffer = null;
}

export var initData = (ArrayBufferData:any) => {
    ArrayBufferData.buffers = [];
    ArrayBufferData.bufferDataMap = {};
}

initData(ArrayBufferData);
