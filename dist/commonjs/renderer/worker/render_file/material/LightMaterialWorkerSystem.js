"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightMaterialUtils_1 = require("../../../utils/material/lightMaterialUtils");
exports.getSpecularColorArr3 = function (index, LightMaterialData) {
    return lightMaterialUtils_1.getSpecularColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.getEmissionColorArr3 = function (index, LightMaterialData) {
    return lightMaterialUtils_1.getEmissionColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialData);
};
exports.getShininess = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getShininess(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.getShading = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getShading(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.getLightModel = function (index, LightMaterialDataFromSystem) {
    return lightMaterialUtils_1.getLightModel(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
exports.setDiffuseMapIndex = function (textureIndex, LightMaterialData) {
    LightMaterialData.diffuseMapIndex = textureIndex;
};
exports.setSpecularMapIndex = function (textureIndex, LightMaterialData) {
    LightMaterialData.specularMapIndex = textureIndex;
};
//# sourceMappingURL=LightMaterialWorkerSystem.js.map