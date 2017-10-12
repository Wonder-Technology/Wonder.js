import { computeRadius as computeRadiusUtils } from "../utils/worker/render_file/light/pointLightUtils";
import { initDataHelper } from "../../../component/light/PointLightSystem";

export const computeRadius = computeRadiusUtils;

export const initData = (PointLightData: any) => {
    initDataHelper(PointLightData);
}
