import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { cleanDirty, getColorDataSize as getSpecifyLightColorDataSize, getDirtyDataSize, isDirty } from "./specifyLightUtils";
export var getColorArr3 = function (index, AmbientLightDataFromSystem) {
    return getColorArr3Utils(index, AmbientLightDataFromSystem);
};
export var getColorDataSize = getSpecifyLightColorDataSize;
export var createTypeArrays = function (buffer, count, AmbientLightDataFromSystem) {
    var offset = 0;
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    AmbientLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
};
export var isColorDirty = function (index, AmbientLightDataFromSystem) {
    return isDirty(getSingleSizeData(index, AmbientLightDataFromSystem.isColorDirtys));
};
export var cleanColorDirty = function (index, AmbientLightDataFromSystem) {
    cleanDirty(index, AmbientLightDataFromSystem.isColorDirtys);
};
//# sourceMappingURL=ambientLightUtils.js.map