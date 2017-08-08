import { initData as initDirectionLightData } from "../../../render_file/light/DirectionLightWorkerSystem";
import { initData as initPointLightData } from "../../../render_file/light/PointLightWorkerSystem";
import { initData as initAmbientLightData } from "../../../render_file/light/AmbientLightWorkerSystem";
import { WebGL1LightInitWorkerData } from "../../../../webgl1/type/messageDataType";

export var initData = (lightData: WebGL1LightInitWorkerData, AmbientLightDataFromSystem: any, DirectionLightDataFromSystem: any, PointLightDataFromSystem: any) => {
    initAmbientLightData(lightData.ambientLightData, AmbientLightDataFromSystem);
    initDirectionLightData(lightData.directionLightData, DirectionLightDataFromSystem);
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
}

