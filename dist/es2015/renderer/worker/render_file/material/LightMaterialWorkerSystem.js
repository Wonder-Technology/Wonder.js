import { computeLightBufferIndex, getEmissionColorArr3 as getEmissionColorArr3Utils, getLightModel as getLightModelUtils, getShading as getShadingUtils, getShininess as getShininessUtils, getSpecularColorArr3 as getSpecularColorArr3Utils, hasDiffuseMap as hasDiffuseMapUtils, hasSpecularMap as hasSpecularMapUtils } from "../../../utils/worker/render_file/material/lightMaterialUtils";
export var getSpecularColorArr3 = function (index, LightMaterialWorkerData) {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var getEmissionColorArr3 = function (index, LightMaterialWorkerData) {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var getShininess = function (index, LightMaterialWorkerData) {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var getShading = function (index, LightMaterialWorkerData) {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var getLightModel = function (index, LightMaterialWorkerData) {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var hasDiffuseMap = function (index, LightMaterialWorkerData) {
    return hasDiffuseMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var hasSpecularMap = function (index, LightMaterialWorkerData) {
    return hasSpecularMapUtils(computeLightBufferIndex(index), LightMaterialWorkerData);
};
export var initData = function (LightMaterialWorkerData) {
};
//# sourceMappingURL=LightMaterialWorkerSystem.js.map