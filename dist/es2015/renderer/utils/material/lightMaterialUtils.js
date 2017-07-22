import { getColorDataSize } from "./materialUtils";
import { getLightMaterialBufferStartIndex } from "./bufferUtils";
import { getColorArr3Data, getSingleSizeData } from "../common/operateBufferDataUtils";
export var getShadingDataSize = function () { return 1; };
export var getLightModelDataSize = function () { return 1; };
export var getShininessDataSize = function () { return 1; };
export var getSpecularColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.specularColors);
};
export var getEmissionColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.emissionColors);
};
export var getShininess = function (materialIndex, LightMaterialDataFromSystem) {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shininess);
};
export var getShading = function (materialIndex, LightMaterialDataFromSystem) {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shadings);
};
export var getLightModel = function (materialIndex, LightMaterialDataFromSystem) {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.lightModels);
};
export var hasDiffuseMap = function (LightMaterialDataFromSystem) {
    return _isLightMapExist(LightMaterialDataFromSystem.diffuseMapIndex);
};
export var hasSpecularMap = function (LightMaterialDataFromSystem) {
    return _isLightMapExist(LightMaterialDataFromSystem.specularMapIndex);
};
var _isLightMapExist = function (mapIndex) { return mapIndex !== null; };
export var computeLightBufferIndex = function (index) { return index - getLightMaterialBufferStartIndex(); };
export var createTypeArrays = function (buffer, offset, count, LightMaterialDataFromSystem) {
    LightMaterialDataFromSystem.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    LightMaterialDataFromSystem.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    LightMaterialDataFromSystem.shininess = new Float32Array(buffer, offset, count * getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getShininessDataSize();
    LightMaterialDataFromSystem.shadings = new Uint8Array(buffer, offset, count * getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getShadingDataSize();
    LightMaterialDataFromSystem.lightModels = new Uint8Array(buffer, offset, count * getLightModelDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getLightModelDataSize();
    return offset;
};
export var getClassName = function () { return "LightMaterial"; };
//# sourceMappingURL=lightMaterialUtils.js.map