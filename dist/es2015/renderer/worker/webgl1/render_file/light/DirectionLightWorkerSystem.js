import { createTypeArrays } from "../../../../utils/worker/render_file/light/directionLightUtils";
import { setCount } from "../../../render_file/light/SpecifyLightWorkerSystem";
export var initData = function (_a, DirectionLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, directionLightGLSLDataStructureMemberNameArr = _a.directionLightGLSLDataStructureMemberNameArr;
    setCount(lightCount, DirectionLightWorkerData);
    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;
    createTypeArrays(buffer, bufferCount, DirectionLightWorkerData);
};
//# sourceMappingURL=DirectionLightWorkerSystem.js.map