import { createTypeArrays } from "../../../../utils/worker/render_file/light/pointLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";
export var initData = function (_a, PointLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, pointLightGLSLDataStructureMemberNameArr = _a.pointLightGLSLDataStructureMemberNameArr;
    setCount(lightCount, PointLightWorkerData);
    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
    createTypeArrays(buffer, bufferCount, PointLightWorkerData);
};
//# sourceMappingURL=PointLightWorkerSystem.js.map