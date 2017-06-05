import { Map } from "immutable";
import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
// import { createRenderCommands } from "../command/RenderCommandSystem";
import { createRenderCommandBuffer } from "../command/RenderCommandBufferSystem";
import { sortRenderCommands } from "../sort/SortRenderCommandSystem";
import { draw } from "../draw/DrawRenderCommandSystem";
// import { init as initMaterial } from "../../component/material/MaterialSystem";
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
import { RenderWorkerData } from "../worker/RenderWorkerData";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";

export var init = (state: Map<any, any>) => {
    // initMaterial(state, material_config, shaderLib_generator as any, DeviceManagerData, ShaderData, MaterialData);
    //todo transfer shaderMap?
    RenderWorkerData.renderWorker.postMessage({
        operateType:EWorkerOperateType.INIT_MATERIAL,
        materialCount: MaterialData.count,
        shaderMap:MaterialData.shaderMap
    });

    return state;
}

// export var clear = (state: Map<any, any>) => {
//     clearGL(getGL(DeviceManagerData, state), render_config.clearColor, DeviceManagerData);
//
//     return state;
// }

export var render = (state: Map<any, any>) => {
    return compose(
        // draw(state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData),
        draw(RenderWorkerData),
        // sortRenderCommands(state),
        createRenderCommandBuffer(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData),
        getRenderList(state)
    )(MeshRendererData)
}
