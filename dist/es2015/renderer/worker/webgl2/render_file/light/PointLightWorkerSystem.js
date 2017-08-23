import { createTypeArrays } from "../../../../utils/worker/render_file/light/pointLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";
import { computeRadius as computeRadiusUtils } from "../../../../webgl2/utils/worker/render_file/light/pointLightUtils";
export var initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
    setCount(lightCount, PointLightWorkerData);
    createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
export var computeRadius = computeRadiusUtils;
//# sourceMappingURL=PointLightWorkerSystem.js.map