"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexBufferUtils_1 = require("../utils/buffer/indexBufferUtils");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var bufferUtils_1 = require("../utils/buffer/bufferUtils");
exports.getOrCreateBuffer = function (gl, geometryIndex, GeometryData, IndexBufferData) {
    return indexBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, GeometrySystem_1.getIndices, GeometryData, IndexBufferData);
};
exports.initData = indexBufferUtils_1.initData;
exports.disposeBuffer = function (geometryIndex, IndexBufferData) {
    bufferUtils_1.disposeBuffer(geometryIndex, IndexBufferData.buffers, DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData);
};
//# sourceMappingURL=IndexBufferSystem.js.map