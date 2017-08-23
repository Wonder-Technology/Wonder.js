import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { getColor3Data } from "../../../../../component/utils/operateBufferDataUtils";
import { getColorDataSize, getIntensityDataSize } from "../../../light/directionLightUtils";
import { cleanDirty, getDirtyDataSize, isDirty } from "./specifyLightUtils";
export var getColor = function (index, DirectionLightDataFromSystem) {
    return getColor3Data(index, DirectionLightDataFromSystem.colors);
};
export var getColorArr3 = function (index, DirectionLightDataFromSystem) {
    return getColorArr3Utils(index, DirectionLightDataFromSystem);
};
export var getIntensity = function (index, DirectionLightDataFromSystem) {
    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
};
export var createTypeArrays = function (buffer, count, DirectionLightDataFromSystem) {
    var offset = 0;
    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getIntensityDataSize();
    DirectionLightDataFromSystem.isPositionDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
    DirectionLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
    DirectionLightDataFromSystem.isIntensityDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
};
export var isPositionDirty = function (index, DirectionLightDataFromSystem) {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isPositionDirtys));
};
export var isColorDirty = function (index, DirectionLightDataFromSystem) {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isColorDirtys));
};
export var isIntensityDirty = function (index, DirectionLightDataFromSystem) {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isIntensityDirtys));
};
export var cleanPositionDirty = function (index, DirectionLightDataFromSystem) {
    cleanDirty(index, DirectionLightDataFromSystem.isPositionDirtys);
};
export var cleanColorDirty = function (index, DirectionLightDataFromSystem) {
    cleanDirty(index, DirectionLightDataFromSystem.isColorDirtys);
};
export var cleanIntensityDirty = function (index, DirectionLightDataFromSystem) {
    cleanDirty(index, DirectionLightDataFromSystem.isIntensityDirtys);
};
//# sourceMappingURL=directionLightUtils.js.map