"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deviceManagerUtils_1 = require("../../both_file/device/deviceManagerUtils");
var basicDrawRenderCommandBufferUtils_1 = require("../../../draw/basic/basicDrawRenderCommandBufferUtils");
var lightDrawRenderCommandBufferUtils_1 = require("../../../draw/light/lightDrawRenderCommandBufferUtils");
exports.clearColor = function (gl, render_config, DeviceManagerDataFromSystem) {
    deviceManagerUtils_1.setClearColor(gl, render_config.clearColor, DeviceManagerDataFromSystem);
};
exports.initData = function (BasicDrawRenderCommandBufferDataFromSystem, LightDrawRenderCommandBufferDataFromSystem) {
    basicDrawRenderCommandBufferUtils_1.initData(BasicDrawRenderCommandBufferDataFromSystem);
    lightDrawRenderCommandBufferUtils_1.initData(LightDrawRenderCommandBufferDataFromSystem);
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map