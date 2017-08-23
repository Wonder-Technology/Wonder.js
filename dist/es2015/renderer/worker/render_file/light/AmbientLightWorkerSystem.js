import { setCount as setSpecifyLightCount } from "./SpecifyLightWorkerSystem";
import { cleanColorDirty as cleanColorDirtyUtils, createTypeArrays, getColorArr3 as getColorArr3Utils, isColorDirty as isColorDirtyUtils } from "../../../utils/worker/render_file/light/ambientLightUtils";
export var getColorArr3 = getColorArr3Utils;
export var initData = function (_a, AmbientLightWorkerData) {
    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
    _setCount(lightCount, AmbientLightWorkerData);
    createTypeArrays(buffer, bufferCount, AmbientLightWorkerData);
};
var _setCount = setSpecifyLightCount;
export var isColorDirty = isColorDirtyUtils;
export var cleanColorDirty = cleanColorDirtyUtils;
//# sourceMappingURL=AmbientLightWorkerSystem.js.map