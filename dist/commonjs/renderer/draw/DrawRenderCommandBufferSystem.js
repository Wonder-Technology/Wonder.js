"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawRenderCommandBufferUtils_1 = require("../utils/draw/drawRenderCommandBufferUtils");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var curry_1 = require("wonder-lodash/curry");
var ShaderSystem_1 = require("../shader/ShaderSystem");
var GeometrySystem_1 = require("../../component/geometry/GeometrySystem");
exports.clear = curry_1.default(function (state, render_config, DeviceManagerData, data) {
    return drawRenderCommandBufferUtils_1.clear(DeviceManagerSystem_1.getGL(DeviceManagerData, state), DeviceManagerSystem_1.clear, render_config, DeviceManagerData, data);
});
exports.draw = curry_1.default(function (state, DataBufferConfig, drawDataMap, bufferData) {
    return drawRenderCommandBufferUtils_1.draw(DeviceManagerSystem_1.getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, drawRenderCommandBufferUtils_1.buildDrawFuncDataMap(ShaderSystem_1.bindIndexBuffer, ShaderSystem_1.sendAttributeData, ShaderSystem_1.sendUniformData, ShaderSystem_1.use, GeometrySystem_1.hasIndices, GeometrySystem_1.getIndicesCount, GeometrySystem_1.getIndexType, GeometrySystem_1.getIndexTypeSize, GeometrySystem_1.getVerticesCount), drawDataMap, bufferData);
});
exports.initData = drawRenderCommandBufferUtils_1.initData;
//# sourceMappingURL=DrawRenderCommandBufferSystem.js.map