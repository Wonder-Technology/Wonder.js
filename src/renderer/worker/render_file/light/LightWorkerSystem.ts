import { LightInitWorkerData } from "../../../type/messageDataType";
import { initData as initAmbientLightData } from "./AmbientLightWorkerSystem";
import { initData as initDirectionLightData } from "./DirectionLightWorkerSystem";
import { initData as initPointLightData } from "./PointLightWorkerSystem";

export var initData = (lightData:LightInitWorkerData, AmbientLightDataFromSystem: any, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => {
    initAmbientLightData(lightData.ambientLightData, AmbientLightDataFromSystem);
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
}

