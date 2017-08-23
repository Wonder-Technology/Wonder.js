"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var operateBufferDataUtils_2 = require("../../../../../component/utils/operateBufferDataUtils");
var directionLightUtils_1 = require("../../../light/directionLightUtils");
var specifyLightUtils_1 = require("./specifyLightUtils");
exports.getColor = function (index, DirectionLightDataFromSystem) {
    return operateBufferDataUtils_2.getColor3Data(index, DirectionLightDataFromSystem.colors);
};
exports.getColorArr3 = function (index, DirectionLightDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3(index, DirectionLightDataFromSystem);
};
exports.getIntensity = function (index, DirectionLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
};
exports.createTypeArrays = function (buffer, count, DirectionLightDataFromSystem) {
    var offset = 0;
    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * directionLightUtils_1.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * directionLightUtils_1.getColorDataSize();
    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * directionLightUtils_1.getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * directionLightUtils_1.getIntensityDataSize();
    DirectionLightDataFromSystem.isPositionDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
    DirectionLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
    DirectionLightDataFromSystem.isIntensityDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
};
exports.isPositionDirty = function (index, DirectionLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, DirectionLightDataFromSystem.isPositionDirtys));
};
exports.isColorDirty = function (index, DirectionLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, DirectionLightDataFromSystem.isColorDirtys));
};
exports.isIntensityDirty = function (index, DirectionLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, DirectionLightDataFromSystem.isIntensityDirtys));
};
exports.cleanPositionDirty = function (index, DirectionLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, DirectionLightDataFromSystem.isPositionDirtys);
};
exports.cleanColorDirty = function (index, DirectionLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, DirectionLightDataFromSystem.isColorDirtys);
};
exports.cleanIntensityDirty = function (index, DirectionLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, DirectionLightDataFromSystem.isIntensityDirtys);
};
//# sourceMappingURL=directionLightUtils.js.map