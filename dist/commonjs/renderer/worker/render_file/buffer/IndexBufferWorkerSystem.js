"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexBufferUtils_1 = require("../../../utils/buffer/indexBufferUtils");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerWorkerData_1 = require("../../both_file/device/DeviceManagerWorkerData");
var bufferUtils_1 = require("../../../utils/worker/render_file/buffer/bufferUtils");
exports.disposeBuffer = function (geometryIndex, IndexBufferWorkerData) {
    bufferUtils_1.disposeBuffer(geometryIndex, IndexBufferWorkerData.buffers, DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData);
};
exports.initData = indexBufferUtils_1.initData;
//# sourceMappingURL=IndexBufferWorkerSystem.js.map