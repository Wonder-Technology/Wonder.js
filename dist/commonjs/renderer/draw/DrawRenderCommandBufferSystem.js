"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var drawRenderCommandBufferUtils_1 = require("../utils/worker/render_file/draw/drawRenderCommandBufferUtils");
exports.clearColor = curry_1.default(function (state, render_config, DeviceManagerData, data) {
    drawRenderCommandBufferUtils_1.clearColor(DeviceManagerSystem_1.getGL(DeviceManagerData, state), render_config, DeviceManagerData);
    return data;
});
exports.initData = drawRenderCommandBufferUtils_1.initData;
//# sourceMappingURL=DrawRenderCommandBufferSystem.js.map