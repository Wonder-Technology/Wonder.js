"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bufferUtils_1 = require("./bufferUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, buffers, getDatas, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
    var buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getDatas(geometryIndex, GeometryDataFromSystem), buffer);
    return buffer;
};
var _initBuffer = function (gl, data, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl);
};
var _resetBindedBuffer = function (gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
exports.initData = function (ArrayBufferDataFromSystemFromSystem) {
    ArrayBufferDataFromSystemFromSystem.vertexBuffer = [];
    ArrayBufferDataFromSystemFromSystem.normalBuffers = [];
    ArrayBufferDataFromSystemFromSystem.texCoordBuffers = [];
};
//# sourceMappingURL=arrayBufferUtils.js.map