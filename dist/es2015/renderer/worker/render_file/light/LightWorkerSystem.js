import { initData as initAmbientLightData } from "./AmbientLightWorkerSystem";
import { initData as initDirectionLightData } from "./DirectionLightWorkerSystem";
import { initData as initPointLightData } from "./PointLightWorkerSystem";
export var initData = function (lightData, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
    initAmbientLightData(lightData.ambientLightData, AmbientLightDataFromSystem);
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
};
//# sourceMappingURL=LightWorkerSystem.js.map