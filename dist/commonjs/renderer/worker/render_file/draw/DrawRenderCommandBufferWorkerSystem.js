"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var drawRenderCommandBufferUtils_1 = require("../../../utils/worker/render_file/draw/drawRenderCommandBufferUtils");
exports.clearColor = function (state, render_config, DeviceManagerWorkerData) {
    drawRenderCommandBufferUtils_1.clearColor(DeviceManagerWorkerSystem_1.getGL(DeviceManagerWorkerData, state), render_config, DeviceManagerWorkerData);
};
exports.commitGL = function (gl, state) {
    gl.commit();
    return state;
};
exports.initData = drawRenderCommandBufferUtils_1.initData;
//# sourceMappingURL=DrawRenderCommandBufferWorkerSystem.js.map