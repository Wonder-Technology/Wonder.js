"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var EBufferType_1 = require("../enum/EBufferType");
var bufferUtils_1 = require("./bufferUtils");
var objectUtils_1 = require("../../utils/objectUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, bufferType, GeometryData, ArrayBufferData) {
    var buffers = ArrayBufferData.buffers, buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, GeometrySystem_1.getVertices(geometryIndex, GeometryData), buffer, ArrayBufferData);
    ArrayBufferData.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType_1.EBufferType.FLOAT
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
exports.initData = function (ArrayBufferData) {
    ArrayBufferData.buffers = [];
    ArrayBufferData.bufferDataMap = objectUtils_1.createMap();
};
//# sourceMappingURL=ArrayBufferSystem.js.map