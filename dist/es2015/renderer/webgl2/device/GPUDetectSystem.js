import curry from "wonder-lodash/curry";
import { detect as detectUtils } from "../utils/worker/render_file/device/gpuDetectUtils";
import { hasExtensionColorBufferFloat as hasExtensionColorBufferFloatUtils } from "../utils/worker/render_file/device/gpuDetectUtils";
export var detect = curry(function (getGL, DeviceManagerData, GPUDetectData, state) {
    return detectUtils(getGL, DeviceManagerData, GPUDetectData, state);
});
export var hasExtensionColorBufferFloat = hasExtensionColorBufferFloatUtils;
//# sourceMappingURL=GPUDetectSystem.js.map