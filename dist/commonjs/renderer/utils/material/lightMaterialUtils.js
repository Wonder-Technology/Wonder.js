"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var materialUtils_1 = require("./materialUtils");
var bufferUtils_1 = require("./bufferUtils");
var operateBufferDataUtils_1 = require("../common/operateBufferDataUtils");
exports.getShadingDataSize = function () { return 1; };
exports.getLightModelDataSize = function () { return 1; };
exports.getShininessDataSize = function () { return 1; };
exports.getSpecularColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3Data(materialIndex, LightMaterialDataFromSystem.specularColors);
};
exports.getEmissionColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getColorArr3Data(materialIndex, LightMaterialDataFromSystem.emissionColors);
};
exports.getShininess = function (materialIndex, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shininess);
};
exports.getShading = function (materialIndex, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shadings);
};
exports.getLightModel = function (materialIndex, LightMaterialDataFromSystem) {
    return operateBufferDataUtils_1.getSingleSizeData(materialIndex, LightMaterialDataFromSystem.lightModels);
};
exports.hasDiffuseMap = function (LightMaterialDataFromSystem) {
    return _isLightMapExist(LightMaterialDataFromSystem.diffuseMapIndex);
};
exports.hasSpecularMap = function (LightMaterialDataFromSystem) {
    return _isLightMapExist(LightMaterialDataFromSystem.specularMapIndex);
};
var _isLightMapExist = function (mapIndex) { return mapIndex !== null; };
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
    return offset;
};
exports.getClassName = function () { return "LightMaterial"; };
//# sourceMappingURL=lightMaterialUtils.js.map