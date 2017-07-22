import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { createTypeArrays, getColor as getColorUtils, getColorArr3 as getColorArr3Utils, getConstant as getConstantUtils, getIntensity as getIntensityUtils, getLinear as getLinearUtils, getQuadratic as getQuadraticUtils, getRange as getRangeUtils } from "../../../utils/light/pointLightUtils";
export var setPositionArr = function (positionArr, PointLightWorkerData) {
    PointLightWorkerData.positionArr = positionArr;
};
export var getColor = getColorUtils;
export var getColorArr3 = getColorArr3Utils;
export var getIntensity = getIntensityUtils;
export var getConstant = getConstantUtils;
export var getLinear = getLinearUtils;
export var getQuadratic = getQuadraticUtils;
export var getRange = getRangeUtils;
export var initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, pointLightGLSLDataStructureMemberNameArr = _a.pointLightGLSLDataStructureMemberNameArr;
    _setCount(lightCount, PointLightWorkerData);
    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
    createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
var _setCount = setSpecifyLightCount;
//# sourceMappingURL=PointLightWorkerSystem.js.map