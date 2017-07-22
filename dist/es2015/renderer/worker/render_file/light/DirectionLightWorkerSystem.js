import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils, getIntensity as getIntensityUtils } from "../../../utils/light/directionLightUtils";
export var setPositionArr = function (positionArr, DirectionLightWorkerData) {
    DirectionLightWorkerData.positionArr = positionArr;
};
export var getColor = getColorUtils;
export var getColorArr3 = getColorArr3Utils;
export var getIntensity = getIntensityUtils;
export var initData = function (_a, DirectionLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, directionLightGLSLDataStructureMemberNameArr = _a.directionLightGLSLDataStructureMemberNameArr;
    _setCount(lightCount, DirectionLightWorkerData);
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;
    createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
};
var _setCount = setSpecifyLightCount;
//# sourceMappingURL=DirectionLightWorkerSystem.js.map