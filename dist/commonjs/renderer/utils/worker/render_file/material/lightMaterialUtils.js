"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var materialUtils_1 = require("./materialUtils");
var operateBufferDataUtils_1 = require("../../../common/operateBufferDataUtils");
var typeArrayUtils_1 = require("../../../../../utils/typeArrayUtils");
var bufferUtils_1 = require("../../../material/bufferUtils");
exports.getShadingDataSize = function () { return 1; };
exports.getLightModelDataSize = function () { return 1; };
exports.getShininessDataSize = function () { return 1; };
exports.getMapSize = function () { return 1; };
exports.getSpecularColorArr3 = function (index, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3Data(index, LightMaterialDataFromSystem.specularColors);
};
exports.getEmissionColorArr3 = function (index, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3Data(index, LightMaterialDataFromSystem.emissionColors);
};
exports.getShininess = function (index, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, LightMaterialDataFromSystem.shininess);
};
exports.getShading = function (index, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, LightMaterialDataFromSystem.shadings);
};
exports.getLightModel = function (index, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(index, LightMaterialDataFromSystem.lightModels);
};
exports.hasDiffuseMap = function (index, LightMaterialDataFromSystem) {
    return _hasMap(index, LightMaterialDataFromSystem.hasDiffuseMaps);
};
exports.hasSpecularMap = function (index, LightMaterialDataFromSystem) {
    return _hasMap(index, LightMaterialDataFromSystem.hasSpecularMaps);
};
exports.markHasMap = function (index, hasMapTypArray) {
    typeArrayUtils_1.setTypeArrayValue(hasMapTypArray, exports.computeLightBufferIndex(index), 1);
};
exports.markNotHasMap = function (index, hasMapTypArray) {
    typeArrayUtils_1.setTypeArrayValue(hasMapTypArray, exports.computeLightBufferIndex(index), exports.getNotHasMapValue());
};
exports.getNotHasMapValue = function () { return 0; };
var _hasMap = function (index, hasMapTypArray) {
    return operateBufferDataUtils_1.getSingleSizeData(index, hasMapTypArray) !== exports.getNotHasMapValue();
};
exports.computeLightBufferIndex = function (index) { return index - bufferUtils_1.getLightMaterialBufferStartIndex(); };
exports.createTypeArrays = function (buffer, offset, count, LightMaterialDataFromSystem) {
    LightMaterialDataFromSystem.specularColors = new Float32Array(buffer, offset, count * materialUtils_1.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * materialUtils_1.getColorDataSize();
    LightMaterialDataFromSystem.emissionColors = new Float32Array(buffer, offset, count * materialUtils_1.getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * materialUtils_1.getColorDataSize();
    LightMaterialDataFromSystem.shininess = new Float32Array(buffer, offset, count * exports.getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * exports.getShininessDataSize();
    LightMaterialDataFromSystem.shadings = new Uint8Array(buffer, offset, count * exports.getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getShadingDataSize();
    LightMaterialDataFromSystem.lightModels = new Uint8Array(buffer, offset, count * exports.getLightModelDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getLightModelDataSize();
    LightMaterialDataFromSystem.hasDiffuseMaps = new Uint8Array(buffer, offset, count * exports.getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getMapSize();
    LightMaterialDataFromSystem.hasSpecularMaps = new Uint8Array(buffer, offset, count * exports.getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * exports.getMapSize();
    return offset;
};
exports.getClassName = function () { return "LightMaterial"; };
//# sourceMappingURL=lightMaterialUtils.js.map