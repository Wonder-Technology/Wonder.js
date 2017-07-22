"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operateBufferDataUtils_1 = require("../../../component/utils/operateBufferDataUtils");
var operateBufferDataUtils_2 = require("../common/operateBufferDataUtils");
var specifyLightUtils_1 = require("./specifyLightUtils");
exports.getColor = function (index, AmbientLightDataFromSystem) {
    return operateBufferDataUtils_1.getColor3Data(index, AmbientLightDataFromSystem.colors);
};
exports.getColorArr3 = function (index, AmbientLightDataFromSystem) {
    return operateBufferDataUtils_2.getColorArr3(index, AmbientLightDataFromSystem);
};
exports.getColorDataSize = specifyLightUtils_1.getColorDataSize;
exports.createTypeArrays = function (buffer, count, AmbientLightDataFromSystem) {
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * exports.getColorDataSize());
};
//# sourceMappingURL=ambientLightUtils.js.map