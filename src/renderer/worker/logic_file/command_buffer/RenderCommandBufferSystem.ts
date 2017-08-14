import { GameObject } from "../../../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    createRenderCommandBufferData as createBasicRenderCommandBufferData,
    initData as initBasicRenderCommandBufferSystemData
} from "./BasicRenderCommandBufferSystem";
import {
    createRenderCommandBufferData as createLightRenderCommandBufferData,
    initData as initLightRenderCommandBufferSystemData
} from "./LightRenderCommandBufferSystem";
import {
    createRenderCommandBufferData as createRenderCommandBufferDataUtils,
    initData as initDataUtils
} from "../../../utils/worker/logic_file/command_buffer/renderComandBufferUtils";

export var createRenderCommandBufferData = curry((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    return createRenderCommandBufferDataUtils(state, createBasicRenderCommandBufferData, createLightRenderCommandBufferData, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData, renderGameObjectArray);
}, 12)

export var initData = initDataUtils;
