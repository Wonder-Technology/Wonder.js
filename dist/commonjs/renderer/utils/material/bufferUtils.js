"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var materialUtils_1 = require("../worker/render_file/material/materialUtils");
var DataBufferConfig_1 = require("../../../config/DataBufferConfig");
exports.getMaterialBufferSize = function () {
    return Float32Array.BYTES_PER_ELEMENT * (materialUtils_1.getShaderIndexDataSize() + materialUtils_1.getColorDataSize() + materialUtils_1.getOpacityDataSize() + materialUtils_1.getAlphaTestDataSize());
};
exports.getBasicMaterialBufferStartIndex = function () { return 0; };
exports.getLightMaterialBufferStartIndex = function () { return DataBufferConfig_1.DataBufferConfig.basicMaterialDataBufferCount; };
//# sourceMappingURL=bufferUtils.js.map