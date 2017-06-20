import { GPUDetector } from "./GPUDetector";
import curry from "wonder-lodash/curry";
export var detect = curry(function (getGL, DeviceManagerDataFromSystem, state) {
    return GPUDetector.getInstance().detect(state, getGL, DeviceManagerDataFromSystem);
});
//# sourceMappingURL=GPUDetectorSystem.js.map