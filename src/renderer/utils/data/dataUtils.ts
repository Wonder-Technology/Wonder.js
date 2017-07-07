import { PointLightData } from "../../../component/light/PointLightData";
import { DirectionLightData } from "../../../component/light/DirectionLightData";

export var getAllRenderDataForNoWorker = () => {
    return {
        PointLightData:PointLightData,
        DirectionLightData:DirectionLightData
    }
}
