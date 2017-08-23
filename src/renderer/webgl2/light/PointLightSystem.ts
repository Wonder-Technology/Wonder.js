import { computeRadius as computeRadiusUtils } from "../utils/worker/render_file/light/pointLightUtils";
import { initDataHelper } from "../../../component/light/PointLightSystem";

export var computeRadius = computeRadiusUtils;

export var initData = (PointLightData: any) => {
    initDataHelper(PointLightData);
}
