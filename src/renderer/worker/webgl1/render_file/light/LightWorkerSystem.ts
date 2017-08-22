import { initData as initDirectionLightData } from "./DirectionLightWorkerSystem";
import { initData as initAmbientLightData } from "../../../render_file/light/AmbientLightWorkerSystem";
import { initData as initPointLightData } from "./PointLightWorkerSystem";
import { WebGL1LightInitWorkerData } from "../../../../webgl1/type/messageDataType";

export var initData = (lightData: WebGL1LightInitWorkerData, AmbientLightDataFromSystem: any, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => {
    initAmbientLightData(lightData.ambientLightData, AmbientLightDataFromSystem);
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
}

