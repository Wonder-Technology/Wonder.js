import { Map } from "immutable";
import { getRenderList } from "../../component/renderComponent/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderComponent/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommands } from "../command/RenderCommandSystem";
import { sortRenderCommands } from "../sort/SortRenderCommandSystem";
import { draw } from "../draw/DrawRenderCommandSystem";
import { init as initMaterial } from "../../component/renderComponent/material/MaterialSystem";
import { MaterialData } from "../../component/renderComponent/material/MaterialData";
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

export var init = (state: Map<any, any>) => {
    initMaterial(state, material_config, shaderLib_generator as any, ShaderData, MaterialData);

    return state;
}

export var clear = (state: Map<any, any>) => {
    clearGL(getGL(state), render_config.render_setting.clearColor, DeviceManagerData);

    return state;
}

export var render = (state: Map<any, any>) => {
    return compose(
        draw(state, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData),
        sortRenderCommands(state),
        createRenderCommands(state, GameObjectData, ThreeDTransformData, MaterialData, GeometryData),
        getRenderList(state)
    )(MeshRendererData)
}
