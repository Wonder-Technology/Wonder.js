"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../common/operateBufferDataUtils");
var operateBufferDataUtils_2 = require("../../../component/utils/operateBufferDataUtils");
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
exports.getColorDataSize = specifyLightUtils_1.getColorDataSize;
exports.getIntensityDataSize = function () { return 1; };
exports.createTypeArrays = function (buffer, count, DirectionLightDataFromSystem) {
    var offset = 0;
    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * exports.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getColorDataSize();
    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * exports.getIntensityDataSize());
};
//# sourceMappingURL=directionLightUtils.js.map