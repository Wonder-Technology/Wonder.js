"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var BasicRenderCommandBufferSystem_1 = require("./BasicRenderCommandBufferSystem");
var LightRenderCommandBufferSystem_1 = require("./LightRenderCommandBufferSystem");
var renderComandBufferUtils_1 = require("../utils/worker/logic_file/command_buffer/renderComandBufferUtils");
exports.createRenderCommandBufferData = curry_1.default(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    return renderComandBufferUtils_1.createRenderCommandBufferData(state, BasicRenderCommandBufferSystem_1.createRenderCommandBufferData, LightRenderCommandBufferSystem_1.createRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray);
}, 12);
exports.initData = renderComandBufferUtils_1.initData;
//# sourceMappingURL=RenderCommandBufferSystem.js.map