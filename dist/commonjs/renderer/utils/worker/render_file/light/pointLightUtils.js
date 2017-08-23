"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var operateBufferDataUtils_2 = require("../../../../../component/utils/operateBufferDataUtils");
var specifyLightUtils_1 = require("./specifyLightUtils");
var specifyLightUtils_2 = require("./specifyLightUtils");
exports.getColor = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_2.getColor3Data(index, PointLightDataFromSystem.colors);
};
exports.getColorArr3 = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3(index, PointLightDataFromSystem);
};
exports.getIntensity = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.intensities);
};
exports.getConstant = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.constants);
};
exports.getLinear = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.linears);
};
exports.getQuadratic = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.quadratics);
};
exports.getRange = function (index, PointLightDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.ranges);
};
exports.getColorDataSize = specifyLightUtils_2.getColorDataSize;
exports.getIntensityDataSize = function () { return 1; };
exports.getConstantDataSize = function () { return 1; };
exports.getLinearDataSize = function () { return 1; };
exports.getQuadraticDataSize = function () { return 1; };
exports.getRangeDataSize = function () { return 1; };
exports.createTypeArrays = function (buffer, count, PointLightDataFromSystem) {
    var offset = 0;
    PointLightDataFromSystem.colors = new Float32Array(buffer, offset, count * exports.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getColorDataSize();
    PointLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * exports.getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getIntensityDataSize();
    PointLightDataFromSystem.constants = new Float32Array(buffer, offset, count * exports.getConstantDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getConstantDataSize();
    PointLightDataFromSystem.linears = new Float32Array(buffer, offset, count * exports.getLinearDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getLinearDataSize();
    PointLightDataFromSystem.quadratics = new Float32Array(buffer, offset, count * exports.getQuadraticDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getQuadraticDataSize();
    PointLightDataFromSystem.ranges = new Float32Array(buffer, offset, count * exports.getRangeDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getRangeDataSize();
    PointLightDataFromSystem.isPositionDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
    PointLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
    PointLightDataFromSystem.isIntensityDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
    PointLightDataFromSystem.isAttenuationDirtys = new Uint8Array(buffer, offset, count * specifyLightUtils_1.getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize();
};
exports.isPositionDirty = function (index, PointLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.isPositionDirtys));
};
exports.isColorDirty = function (index, PointLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.isColorDirtys));
};
exports.isIntensityDirty = function (index, PointLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.isIntensityDirtys));
};
exports.isAttenuationDirty = function (index, PointLightDataFromSystem) {
    return specifyLightUtils_1.isDirty(operateBufferDataUtils_1.getSingleSizeData(index, PointLightDataFromSystem.isAttenuationDirtys));
};
exports.cleanPositionDirty = function (index, PointLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, PointLightDataFromSystem.isPositionDirtys);
};
exports.cleanColorDirty = function (index, PointLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, PointLightDataFromSystem.isColorDirtys);
};
exports.cleanIntensityDirty = function (index, PointLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, PointLightDataFromSystem.isIntensityDirtys);
};
exports.cleanAttenuationDirty = function (index, PointLightDataFromSystem) {
    specifyLightUtils_1.cleanDirty(index, PointLightDataFromSystem.isAttenuationDirtys);
};
//# sourceMappingURL=pointLightUtils.js.map