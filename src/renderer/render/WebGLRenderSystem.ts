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
import { initData as initRenderCommandBufferData } from "../command/RenderCommandBufferSystem";
import { RenderCommandBufferData } from "../command/RenderCommandBufferData";
import { ERenderWorkerState } from "../worker/ERenderWorkerState";
import { WebGLRenderWorkerData } from "./WebGLRenderWorkerData";

//todo extract WebGLRenderWorkerSystem?

export var init = (state: Map<any, any>) => {
    // initMaterial(state, material_config, shaderLib_generator as any, DeviceManagerData, ShaderData, MaterialData);

    var renderWorker = RenderWorkerData.renderWorker;

    //todo transfer shaderMap?
    renderWorker.postMessage({
        operateType:EWorkerOperateType.INIT_MATERIAL_GEOMETRY,
        // shaderMap:MaterialData.shaderMap,
        materialData:{
            buffer:MaterialData.buffer,
            materialCount: MaterialData.count,
            materialClassNameTable:MaterialData.materialClassNameTable,
            shaderIndexTable:MaterialData.shaderIndexTable
        },
        geometryData:{
            buffer:GeometryData.buffer,
            indexType: GeometryData.indexType,
            indexTypeSize: GeometryData.indexTypeSize,
            verticesInfoList:GeometryData.verticesInfoList,
            indicesInfoList:GeometryData.indicesInfoList
        }
    });

    renderWorker.onmessage = (e) => {
        var data = e.data,
            state = data.state;

        WebGLRenderWorkerData.state = ERenderWorkerState.INIT_COMPLETE;
    };

    return state;
}

// export var clear = (state: Map<any, any>) => {
//     clearGL(getGL(DeviceManagerData, state), render_config.clearColor, DeviceManagerData);
//
//     return state;
// }

export var render = (state: Map<any, any>) => {
    if(WebGLRenderWorkerData.state !== ERenderWorkerState.INIT_COMPLETE){
        return state;
    }

    return compose(
        // draw(state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData),
        draw(RenderWorkerData, MaterialData, GeometryData),
        // sortRenderCommands(state),
        createRenderCommandBuffer(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
        getRenderList(state)
    )(MeshRendererData)
}

var _initData = (WebGLRenderWorkerData:any) => {
    WebGLRenderWorkerData.state = ERenderWorkerState.DEFAULT;
}

_initData(WebGLRenderWorkerData);

initRenderCommandBufferData(render_config, RenderCommandBufferData);
