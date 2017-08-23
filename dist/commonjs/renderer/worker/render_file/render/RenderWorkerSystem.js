"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectionLightPosition = function (index, DirectionLightDataFromSystem) {
    return _getLightPosition(index, DirectionLightDataFromSystem);
};
exports.getPointLightPosition = function (index, PointLightDataFromSystem) {
    return _getLightPosition(index, PointLightDataFromSystem);
};
var _getLightPosition = function (index, LightDataFromSystem) {
    return LightDataFromSystem.positionArr[index];
};
//# sourceMappingURL=RenderWorkerSystem.js.map