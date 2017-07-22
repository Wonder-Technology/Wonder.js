"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBufferConfig_1 = require("../../../config/DataBufferConfig");
exports.getAmbientLightBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.ambientLightDataBufferCount;
};
exports.getDirectionLightBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.directionLightDataBufferCount;
};
exports.getPointLightBufferCount = function () {
    return DataBufferConfig_1.DataBufferConfig.pointLightDataBufferCount;
};
//# sourceMappingURL=bufferUtils.js.map