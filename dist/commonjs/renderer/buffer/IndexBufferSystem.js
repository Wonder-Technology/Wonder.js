"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var bufferUtils_1 = require("./bufferUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, GeometryData, IndexBufferData) {
    var buffers = IndexBufferData.buffers, buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, GeometrySystem_1.getIndices(geometryIndex, GeometryData), buffer, IndexBufferData);
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
exports.getType = function (GeometryData) {
    return GeometrySystem_1.getIndexType(GeometryData);
};
exports.getTypeSize = function (GeometryData) {
    return GeometrySystem_1.getIndexTypeSize(GeometryData);
};
exports.initData = function (IndexBufferData) {
    IndexBufferData.buffers = [];
};
//# sourceMappingURL=IndexBufferSystem.js.map