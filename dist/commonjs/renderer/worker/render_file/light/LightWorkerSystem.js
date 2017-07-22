"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmbientLightWorkerSystem_1 = require("./AmbientLightWorkerSystem");
var DirectionLightWorkerSystem_1 = require("./DirectionLightWorkerSystem");
var PointLightWorkerSystem_1 = require("./PointLightWorkerSystem");
exports.initData = function (lightData, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    AmbientLightWorkerSystem_1.initData(lightData.ambientLightData, AmbientLightDataFromSystem);
    DirectionLightWorkerSystem_1.initData(lightData.directionLightData, DirectionLightDataFromSystem);
    PointLightWorkerSystem_1.initData(lightData.pointLightData, PointLightDataFromSystem);
};
//# sourceMappingURL=LightWorkerSystem.js.map