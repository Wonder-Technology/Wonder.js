"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrayBufferUtils_1 = require("../utils/buffer/arrayBufferUtils");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var bufferUtils_1 = require("../utils/buffer/bufferUtils");
exports.disposeBuffer = function (geometryIndex, ArrayBufferData) {
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferData.vertexBuffer, DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData);
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferData.normalBuffers, DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData);
    bufferUtils_1.disposeBuffer(geometryIndex, ArrayBufferData.texCoordBuffers, DeviceManagerSystem_1.getGL, DeviceManagerData_1.DeviceManagerData);
};
exports.initData = arrayBufferUtils_1.initData;
//# sourceMappingURL=ArrayBufferSystem.js.map