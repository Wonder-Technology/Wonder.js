"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecifyLightWorkerSystem_1 = require("./SpecifyLightWorkerSystem");
var directionLightUtils_1 = require("../../../utils/light/directionLightUtils");
exports.setPositionArr = function (positionArr, DirectionLightWorkerData) {
    DirectionLightWorkerData.positionArr = positionArr;
};
exports.getColor = directionLightUtils_1.getColor;
exports.getColorArr3 = directionLightUtils_1.getColorArr3;
exports.getIntensity = directionLightUtils_1.getIntensity;
exports.initData = function (_a, DirectionLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, directionLightGLSLDataStructureMemberNameArr = _a.directionLightGLSLDataStructureMemberNameArr;
    _setCount(lightCount, DirectionLightWorkerData);
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;
    directionLightUtils_1.createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
};
var _setCount = SpecifyLightWorkerSystem_1.setCount;
//# sourceMappingURL=DirectionLightWorkerSystem.js.map