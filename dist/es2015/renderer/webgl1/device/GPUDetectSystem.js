import curry from "wonder-lodash/curry";
import { detect as detectUtils } from "../utils/worker/render_file/device/gpuDetectUtils";
export var detect = curry(function (getGL, DeviceManagerData, GPUDetectData, state) {
    return detectUtils(getGL, DeviceManagerData, GPUDetectData, state);
});
//# sourceMappingURL=GPUDetectSystem.js.map