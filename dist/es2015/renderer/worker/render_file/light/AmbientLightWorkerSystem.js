import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { createTypeArrays, getColorArr3 as getColorArr3Utils } from "../../../utils/light/ambientLightUtils";
export var getColorArr3 = getColorArr3Utils;
export var initData = function (_a, AmbientLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
    _setCount(lightCount, AmbientLightWorkerData);
    createTypeArrays(buffer, bufferCount, AmbientLightWorkerData);
};
var _setCount = setSpecifyLightCount;
//# sourceMappingURL=AmbientLightWorkerSystem.js.map