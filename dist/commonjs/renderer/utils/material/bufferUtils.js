"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBufferConfig_1 = require("../../../config/DataBufferConfig");
var materialUtils_1 = require("./materialUtils");
var lightMaterialUtils_1 = require("./lightMaterialUtils");
exports.getMaterialBufferSize = function () {
    return Float32Array.BYTES_PER_ELEMENT * (materialUtils_1.getShaderIndexDataSize() + materialUtils_1.getColorDataSize() + materialUtils_1.getOpacityDataSize() + materialUtils_1.getAlphaTestDataSize());
};
exports.getBasicMaterialBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.basicMaterialDataBufferCount;
};
exports.getBasicMaterialBufferSize = function () {
    return exports.getMaterialBufferSize();
};
exports.getLightMaterialBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.lightMaterialDataBufferCount;
};
exports.getLightMaterialBufferSize = function () {
    return exports.getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (materialUtils_1.getShaderIndexDataSize() + lightMaterialUtils_1.getLightModelDataSize()) + Float32Array.BYTES_PER_ELEMENT * (materialUtils_1.getColorDataSize() * 2 + lightMaterialUtils_1.getShininessDataSize());
};
exports.getBufferLength = function () {
    return exports.getBasicMaterialBufferCount() * exports.getBasicMaterialBufferSize() + exports.getLightMaterialBufferCount() * exports.getLightMaterialBufferSize();
};
exports.getBufferTotalCount = function () {
    return exports.getBasicMaterialBufferCount() + exports.getLightMaterialBufferCount();
};
exports.getBasicMaterialBufferStartIndex = function () { return 0; };
exports.getLightMaterialBufferStartIndex = function () { return DataBufferConfig_1.DataBufferConfig.basicMaterialDataBufferCount; };
//# sourceMappingURL=bufferUtils.js.map