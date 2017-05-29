import { getVertices } from "../../component/geometry/GeometrySystem";
import { EBufferType } from "../enum/EBufferType";
import { isBufferExist } from "./bufferUtils";
import { createMap } from "../../utils/objectUtils";
export var getOrCreateBuffer = function (gl, geometryIndex, bufferType, GeometryData, ArrayBufferData) {
    var buffers = ArrayBufferData.buffers, buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getVertices(geometryIndex, GeometryData), buffer, ArrayBufferData);
    ArrayBufferData.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType.FLOAT
    };
    return buffer;
};
var _initBuffer = function (gl, data, buffer, ArrayBufferData) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl, ArrayBufferData);
};
var _resetBindedBuffer = function (gl, ArrayBufferData) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
export var initData = function (ArrayBufferData) {
    ArrayBufferData.buffers = [];
    ArrayBufferData.bufferDataMap = createMap();
};
//# sourceMappingURL=ArrayBufferSystem.js.map