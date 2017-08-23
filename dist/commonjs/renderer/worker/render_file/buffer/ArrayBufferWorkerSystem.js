"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayBufferUtils_1 = require("../../../utils/buffer/arrayBufferUtils");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
var bufferUtils_1 = require("../../../utils/worker/render_file/buffer/bufferUtils");
exports.disposeBuffer = function (geometryIndex, ArrayBufferWorkerData) {
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferWorkerData.vertexBuffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferWorkerData.normalBuffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferWorkerData.texCoordBuffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
};
exports.initData = arrayBufferUtils_1.initData;
//# sourceMappingURL=ArrayBufferWorkerSystem.js.map