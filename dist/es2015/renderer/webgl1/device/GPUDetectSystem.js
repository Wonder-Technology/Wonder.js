import curry from "wonder-lodash/curry";
import { detect as detectUtils, initData as initDataUtils } from "../utils/worker/render_file/device/gpuDetectUtils";
export var detect = curry(function (getGL, DeviceManagerData, GPUDetectData, state) {
    return detectUtils(getGL, DeviceManagerData, GPUDetectData, state);
});
export var initData = initDataUtils;
//# sourceMappingURL=GPUDetectSystem.js.map