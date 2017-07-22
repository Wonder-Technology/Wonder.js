import { computeLightBufferIndex, getEmissionColorArr3 as getEmissionColorArr3Utils, getLightModel as getLightModelUtils, getShading as getShadingUtils, getShininess as getShininessUtils, getSpecularColorArr3 as getSpecularColorArr3Utils } from "../../../utils/material/lightMaterialUtils";
export var getSpecularColorArr3 = function (index, LightMaterialData) {
    return getSpecularColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
};
export var getEmissionColorArr3 = function (index, LightMaterialData) {
    return getEmissionColorArr3Utils(computeLightBufferIndex(index), LightMaterialData);
};
export var getShininess = function (index, LightMaterialDataFromSystem) {
    return getShininessUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var getShading = function (index, LightMaterialDataFromSystem) {
    return getShadingUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var getLightModel = function (index, LightMaterialDataFromSystem) {
    return getLightModelUtils(computeLightBufferIndex(index), LightMaterialDataFromSystem);
};
export var setDiffuseMapIndex = function (textureIndex, LightMaterialData) {
    LightMaterialData.diffuseMapIndex = textureIndex;
};
export var setSpecularMapIndex = function (textureIndex, LightMaterialData) {
    LightMaterialData.specularMapIndex = textureIndex;
};
//# sourceMappingURL=LightMaterialWorkerSystem.js.map