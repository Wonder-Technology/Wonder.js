import { computeRadius as computeRadiusUtils } from "../utils/worker/render_file/light/pointLightUtils";
import { initDataHelper } from "../../../component/light/PointLightSystem";
export var computeRadius = computeRadiusUtils;
export var initData = function (PointLightData) {
    initDataHelper(PointLightData);
};
//# sourceMappingURL=PointLightSystem.js.map