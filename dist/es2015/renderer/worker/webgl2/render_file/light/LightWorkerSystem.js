import { initData as initPointLightData } from "./PointLightWorkerSystem";
import { initData as initDirectionLightData } from "./DirectionLightWorkerSystem";
export var initData = function (lightData, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
};
//# sourceMappingURL=LightWorkerSystem.js.map