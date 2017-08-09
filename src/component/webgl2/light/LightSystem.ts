import {
    initData as initAmbientLightData
} from "../../light/AmbientLightSystem";
import {
    initData as initDirectionLightData
} from "../../light/DirectionLightSystem";
import { initData as initWebGL2PointLightData } from "../../../renderer/webgl2/light/PointLightSystem";

export var initData = (AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
    initAmbientLightData(AmbientLightData);
    initDirectionLightData(DirectionLightData);
    initWebGL2PointLightData(PointLightData);
}
