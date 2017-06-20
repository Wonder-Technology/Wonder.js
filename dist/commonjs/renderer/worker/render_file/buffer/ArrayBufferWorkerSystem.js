"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayBufferUtils_1 = require("../../../utils/buffer/arrayBufferUtils");
var bufferUtils_1 = require("../../../utils/buffer/bufferUtils");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
exports.getOrCreateBuffer = arrayBufferUtils_1.getOrCreateBuffer;
exports.disposeBuffer = function (geometryIndex, ArrayBufferWorkerData) {
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferWorkerData.buffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
};
exports.initData = arrayBufferUtils_1.initData;
//# sourceMappingURL=ArrayBufferWorkerSystem.js.map