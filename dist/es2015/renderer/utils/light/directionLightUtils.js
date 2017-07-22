import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../common/operateBufferDataUtils";
import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";
export var getColor = function (index, DirectionLightDataFromSystem) {
    return getColor3Data(index, DirectionLightDataFromSystem.colors);
};
export var getColorArr3 = function (index, DirectionLightDataFromSystem) {
    return getColorArr3Utils(index, DirectionLightDataFromSystem);
};
export var getIntensity = function (index, DirectionLightDataFromSystem) {
    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
};
export var getColorDataSize = getSpecifyLightColorDataSize;
export var getIntensityDataSize = function () { return 1; };
export var createTypeArrays = function (buffer, count, DirectionLightDataFromSystem) {
    var offset = 0;
    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
};
//# sourceMappingURL=directionLightUtils.js.map