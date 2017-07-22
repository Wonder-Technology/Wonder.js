"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecifyLightWorkerSystem_1 = require("./SpecifyLightWorkerSystem");
var pointLightUtils_1 = require("../../../utils/light/pointLightUtils");
exports.setPositionArr = function (positionArr, PointLightWorkerData) {
    PointLightWorkerData.positionArr = positionArr;
};
exports.getColor = pointLightUtils_1.getColor;
exports.getColorArr3 = pointLightUtils_1.getColorArr3;
exports.getIntensity = pointLightUtils_1.getIntensity;
exports.getConstant = pointLightUtils_1.getConstant;
exports.getLinear = pointLightUtils_1.getLinear;
exports.getQuadratic = pointLightUtils_1.getQuadratic;
exports.getRange = pointLightUtils_1.getRange;
exports.initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, pointLightGLSLDataStructureMemberNameArr = _a.pointLightGLSLDataStructureMemberNameArr;
    _setCount(lightCount, PointLightWorkerData);
    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
    pointLightUtils_1.createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
var _setCount = SpecifyLightWorkerSystem_1.setCount;
//# sourceMappingURL=PointLightWorkerSystem.js.map