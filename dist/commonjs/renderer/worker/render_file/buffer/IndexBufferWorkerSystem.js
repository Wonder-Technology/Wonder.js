"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexBufferUtils_1 = require("../../../utils/buffer/indexBufferUtils");
var GeometryWorkerSystem_1 = require("../geometry/GeometryWorkerSystem");
var bufferUtils_1 = require("../../../utils/buffer/bufferUtils");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
exports.getOrCreateBuffer = function (gl, geometryIndex, GeometryWorkerData, IndexBufferWorkerData) {
    return indexBufferUtils_1.getOrCreateBuffer(gl, geometryIndex, GeometryWorkerSystem_1.getIndices, GeometryWorkerData, IndexBufferWorkerData);
};
exports.disposeBuffer = function (geometryIndex, IndexBufferWorkerData) {
    bufferUtils_1.disposeBuffer(geometryIndex, IndexBufferWorkerData.buffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
};
exports.initData = indexBufferUtils_1.initData;
//# sourceMappingURL=IndexBufferWorkerSystem.js.map