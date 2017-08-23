"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var specifyLightUtils_1 = require("./specifyLightUtils");
exports.getColorArr3 = function (index, AmbientLightDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3(index, AmbientLightDataFromSystem);
};
exports.getColorDataSize = specifyLightUtils_1.getColorDataSize;
exports.createTypeArrays = function (buffer, count, AmbientLightDataFromSystem) {
    var offset = 0;
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * exports.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getColorDataSize();
    AmbientLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
};
exports.isColorDirty = function (index, AmbientLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, AmbientLightDataFromSystem.isColorDirtys));
};
exports.cleanColorDirty = function (index, AmbientLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, AmbientLightDataFromSystem.isColorDirtys);
};
//# sourceMappingURL=ambientLightUtils.js.map