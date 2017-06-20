"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EBufferType_1 = require("../../enum/EBufferType");
var bufferUtils_1 = require("./bufferUtils");
var objectUtils_1 = require("../../../utils/objectUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, bufferType, getVertices, GeometryWorkerData, ArrayBufferDataFromSystem) {
    var buffers = ArrayBufferDataFromSystem.buffers, buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getVertices(geometryIndex, GeometryWorkerData), buffer);
    ArrayBufferDataFromSystem.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType_1.EBufferType.FLOAT
    };
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
    ArrayBufferDataFromSystemFromSystem.buffers = [];
    ArrayBufferDataFromSystemFromSystem.bufferDataMap = objectUtils_1.createMap();
};
//# sourceMappingURL=arrayBufferUtils.js.map