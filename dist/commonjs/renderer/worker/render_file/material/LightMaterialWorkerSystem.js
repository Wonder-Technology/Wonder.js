"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightMaterialUtils_1 = require("../../../utils/worker/render_file/material/lightMaterialUtils");
var MaterialWorkerSystem_1 = require("./MaterialWorkerSystem");
var MaterialWorkerData_1 = require("./MaterialWorkerData");
exports.getSpecularColorArr3 = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.getSpecularColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.getEmissionColorArr3 = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.getEmissionColorArr3(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.getShininess = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.getShininess(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.getShading = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.getShading(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.getLightModel = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.getLightModel(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.hasDiffuseMap = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.hasDiffuseMap(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.hasSpecularMap = function (index, LightMaterialWorkerData) {
    return lightMaterialUtils_1.hasSpecularMap(lightMaterialUtils_1.computeLightBufferIndex(index), LightMaterialWorkerData);
};
exports.initMaterialWithoutInitMap = function (index, state) {
    MaterialWorkerSystem_1.initMaterial(index, state, lightMaterialUtils_1.getClassName(), MaterialWorkerData_1.MaterialWorkerData);
};
exports.initData = function (LightMaterialWorkerData) {
};
//# sourceMappingURL=LightMaterialWorkerSystem.js.map