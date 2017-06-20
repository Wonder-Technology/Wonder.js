"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayBufferUtils_1 = require("../utils/buffer/arrayBufferUtils");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var bufferUtils_1 = require("../utils/buffer/bufferUtils");
exports.getOrCreateBuffer = arrayBufferUtils_1.getOrCreateBuffer;
exports.initData = arrayBufferUtils_1.initData;
exports.disposeBuffer = function (geometryIndex, ArrayBufferData) {
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferData.buffers, DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData);
};
//# sourceMappingURL=ArrayBufferSystem.js.map