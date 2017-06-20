"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bufferUtils_1 = require("./bufferUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, getIndices, GeometryWorkerData, IndexBufferDataFromSystem) {
    var buffers = IndexBufferDataFromSystem.buffers, buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getIndices(geometryIndex, GeometryWorkerData), buffer, IndexBufferDataFromSystem);
    return buffer;
};
var _initBuffer = function (gl, data, buffer, IndexBufferDataFromSystem) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl, IndexBufferDataFromSystem);
};
var _resetBindedBuffer = function (gl, IndexBufferDataFromSystem) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};
exports.initData = function (IndexBufferDataFromSystem) {
    IndexBufferDataFromSystem.buffers = [];
};
//# sourceMappingURL=indexBufferUtils.js.map