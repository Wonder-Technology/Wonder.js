import { getColorDataSize } from "./materialUtils";
import { getColorArr3Data, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { setTypeArrayValue } from "../../../../../utils/typeArrayUtils";
import { getLightMaterialBufferStartIndex } from "../../../material/bufferUtils";
export var getShadingDataSize = function () { return 1; };
export var getLightModelDataSize = function () { return 1; };
export var getShininessDataSize = function () { return 1; };
export var getMapSize = function () { return 1; };
export var getSpecularColorArr3 = function (index, LightMaterialDataFromSystem) {
    return getColorArr3Data(index, LightMaterialDataFromSystem.specularColors);
};
export var getEmissionColorArr3 = function (index, LightMaterialDataFromSystem) {
    return getColorArr3Data(index, LightMaterialDataFromSystem.emissionColors);
};
export var getShininess = function (index, LightMaterialDataFromSystem) {
    return getSingleSizeData(index, LightMaterialDataFromSystem.shininess);
};
export var getShading = function (index, LightMaterialDataFromSystem) {
    return getSingleSizeData(index, LightMaterialDataFromSystem.shadings);
};
export var getLightModel = function (index, LightMaterialDataFromSystem) {
    return getSingleSizeData(index, LightMaterialDataFromSystem.lightModels);
};
export var hasDiffuseMap = function (index, LightMaterialDataFromSystem) {
    return _hasMap(index, LightMaterialDataFromSystem.hasDiffuseMaps);
};
export var hasSpecularMap = function (index, LightMaterialDataFromSystem) {
    return _hasMap(index, LightMaterialDataFromSystem.hasSpecularMaps);
};
export var markHasMap = function (index, hasMapTypArray) {
    setTypeArrayValue(hasMapTypArray, computeLightBufferIndex(index), 1);
};
export var markNotHasMap = function (index, hasMapTypArray) {
    setTypeArrayValue(hasMapTypArray, computeLightBufferIndex(index), getNotHasMapValue());
};
export var getNotHasMapValue = function () { return 0; };
var _hasMap = function (index, hasMapTypArray) {
    return getSingleSizeData(index, hasMapTypArray) !== getNotHasMapValue();
};
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
    LightMaterialDataFromSystem.hasDiffuseMaps = new Uint8Array(buffer, offset, count * getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getMapSize();
    LightMaterialDataFromSystem.hasSpecularMaps = new Uint8Array(buffer, offset, count * getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getMapSize();
    return offset;
};
export var getClassName = function () { return "LightMaterial"; };
//# sourceMappingURL=lightMaterialUtils.js.map