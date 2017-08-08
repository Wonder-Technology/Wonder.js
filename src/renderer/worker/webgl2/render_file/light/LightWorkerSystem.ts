// import { initData as initPointLightData } from "../../../render_file/light/PointLightWorkerSystem";
import { WebGL2LightInitWorkerData } from "../../../../webgl2/type/messageDataType";
import { initData as initPointLightData } from "./PointLightWorkerSystem";

export var initData = (lightData: WebGL2LightInitWorkerData, PointLightDataFromSystem: any) => {
    initPointLightData(lightData.pointLightData, PointLightDataFromSystem);
}

