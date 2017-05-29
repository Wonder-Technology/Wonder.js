import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommands } from "../command/RenderCommandSystem";
import { sortRenderCommands } from "../sort/SortRenderCommandSystem";
import { draw } from "../draw/DrawRenderCommandSystem";
import { init as initMaterial } from "../../component/material/MaterialSystem";
import { MaterialData } from "../../component/material/MaterialData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { ShaderData } from "../shader/ShaderData";
import { material_config } from "../data/material_config";
import { shaderLib_generator } from "../data/shaderLib_generator";
import { GeometryData } from "../../component/geometry/GeometryData";
import { ArrayBufferData } from "../buffer/ArrayBufferData";
import { IndexBufferData } from "../buffer/IndexBufferData";
import { clear as clearGL, getGL } from "../../device/DeviceManagerSystem";
import { render_config } from "../data/render_config";
import { DeviceManagerData } from "../../device/DeviceManagerData";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { SceneData } from "../../core/entityObject/scene/SceneData";
import { CameraControllerData } from "../../component/camera/CameraControllerData";
import { CameraData } from "../../component/camera/CameraData";
export var init = function (state) {
    initMaterial(state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData);
    return state;
};
export var clear = function (state) {
    clearGL(getGL(DeviceManagerData, state), render_config.render_setting.clearColor, DeviceManagerData);
    return state;
};
export var render = function (state) {
    return compose(draw(state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData), sortRenderCommands(state), createRenderCommands(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData), getRenderList(state))(MeshRendererData);
};
//# sourceMappingURL=WebGLRenderSystem.js.map