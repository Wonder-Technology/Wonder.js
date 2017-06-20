"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GPUDetector_1 = require("./GPUDetector");
var curry_1 = require("wonder-lodash/curry");
exports.detect = curry_1.default(function (getGL, DeviceManagerDataFromSystem, state) {
    return GPUDetector_1.GPUDetector.getInstance().detect(state, getGL, DeviceManagerDataFromSystem);
});
//# sourceMappingURL=GPUDetectorSystem.js.map