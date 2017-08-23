"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBufferConfig_1 = require("../../../../../config/DataBufferConfig");
var materialUtils_1 = require("./materialUtils");
var lightMaterialUtils_1 = require("./lightMaterialUtils");
var bufferUtils_1 = require("../../../material/bufferUtils");
exports.getBasicMaterialBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.basicMaterialDataBufferCount;
};
exports.getBasicMaterialBufferSize = function () {
    return bufferUtils_1.getMaterialBufferSize();
};
exports.getLightMaterialBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.lightMaterialDataBufferCount;
};
exports.getBufferLength = function () {
    return exports.getBasicMaterialBufferCount() * exports.getBasicMaterialBufferSize() + exports.getLightMaterialBufferCount() * exports.getLightMaterialBufferSize();
};
exports.getLightMaterialBufferSize = function () {
    return bufferUtils_1.getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (materialUtils_1.getShaderIndexDataSize() + lightMaterialUtils_1.getLightModelDataSize() + lightMaterialUtils_1.getMapSize() * 2) + Float32Array.BYTES_PER_ELEMENT * (materialUtils_1.getColorDataSize() * 2 + lightMaterialUtils_1.getShininessDataSize());
};
exports.getBufferTotalCount = function () {
    return exports.getBasicMaterialBufferCount() + exports.getLightMaterialBufferCount();
};
//# sourceMappingURL=bufferUtils.js.map