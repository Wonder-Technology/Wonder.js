import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { getColorArr3 as getColorArr3Utils } from "../common/operateBufferDataUtils";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";
export var getColor = function (index, AmbientLightDataFromSystem) {
    return getColor3Data(index, AmbientLightDataFromSystem.colors);
};
export var getColorArr3 = function (index, AmbientLightDataFromSystem) {
    return getColorArr3Utils(index, AmbientLightDataFromSystem);
};
export var getColorDataSize = getSpecifyLightColorDataSize;
export var createTypeArrays = function (buffer, count, AmbientLightDataFromSystem) {
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize());
};
//# sourceMappingURL=ambientLightUtils.js.map