import curry from "wonder-lodash/curry";
import { createRenderCommandBufferData as createBasicRenderCommandBufferData } from "./BasicRenderCommandBufferSystem";
import { createRenderCommandBufferData as createLightRenderCommandBufferData } from "./LightRenderCommandBufferSystem";
import { createRenderCommandBufferData as createRenderCommandBufferDataUtils, initData as initDataUtils } from "../utils/worker/logic_file/command_buffer/renderComandBufferUtils";
export var createRenderCommandBufferData = curry(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray) {
    return createRenderCommandBufferDataUtils(state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray);
}, 12);
export var initData = initDataUtils;
//# sourceMappingURL=RenderCommandBufferSystem.js.map