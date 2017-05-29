import { getIndexType, getIndexTypeSize, getIndices } from "../../component/geometry/GeometrySystem";
import { isBufferExist } from "./bufferUtils";
export var getOrCreateBuffer = function (gl, geometryIndex, GeometryData, IndexBufferData) {
    var buffers = IndexBufferData.buffers, buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getIndices(geometryIndex, GeometryData), buffer, IndexBufferData);
    return buffer;
};
var _initBuffer = function (gl, data, buffer, IndexBufferData) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl, IndexBufferData);
};
var _resetBindedBuffer = function (gl, IndexBufferData) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};
export var getType = function (GeometryData) {
    return getIndexType(GeometryData);
};
export var getTypeSize = function (GeometryData) {
    return getIndexTypeSize(GeometryData);
};
export var initData = function (IndexBufferData) {
    IndexBufferData.buffers = [];
};
//# sourceMappingURL=IndexBufferSystem.js.map