"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var gpuDetectUtils_1 = require("../utils/worker/render_file/device/gpuDetectUtils");
exports.detect = curry_1.default(function (getGL, DeviceManagerData, GPUDetectData, state) {
    return gpuDetectUtils_1.detect(getGL, DeviceManagerData, GPUDetectData, state);
});
exports.initData = gpuDetectUtils_1.initData;
//# sourceMappingURL=GPUDetectSystem.js.map