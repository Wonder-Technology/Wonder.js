"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointLightWorkerSystem_1 = require("./PointLightWorkerSystem");
var DirectionLightWorkerSystem_1 = require("./DirectionLightWorkerSystem");
exports.initData = function (lightData, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    DirectionLightWorkerSystem_1.initData(lightData.directionLightData, DirectionLightDataFromSystem);
    PointLightWorkerSystem_1.initData(lightData.pointLightData, PointLightDataFromSystem);
};
//# sourceMappingURL=LightWorkerSystem.js.map