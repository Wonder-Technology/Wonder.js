import { WebGL2LightInitWorkerData } from "../../../../webgl2/type/messageDataType";
import { initData as initPointLightData } from "./PointLightWorkerSystem";
import { initData as initDirectionLightData } from "./DirectionLightWorkerSystem";

export const initData = (lightData: WebGL2LightInitWorkerData, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => {
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
}

