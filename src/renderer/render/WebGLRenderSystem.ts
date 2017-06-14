import { Map } from "immutable";
import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
// import { createRenderCommands } from "../command/RenderCommandSystem";
import { createRenderCommandBuffer } from "../command/RenderCommandBufferSystem";
import { sortRenderCommands } from "../sort/SortRenderCommandSystem";
import { sendDrawData } from "../worker/logic_file/draw/SendDrawRenderCommandDataSystem";
import { init as initMaterial } from "../../component/material/MaterialSystem";
import { MaterialData } from "../../component/material/MaterialData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { material_config } from "../data/material_config";
import { shaderLib_generator } from "../data/shaderLib_generator";
import { GeometryData } from "../../component/geometry/GeometryData";
import { ArrayBufferData } from "../buffer/ArrayBufferData";
import { IndexBufferData } from "../buffer/IndexBufferData";
import { clear as clearGL, getGL } from "../device/DeviceManagerSystem";
import { render_config } from "../data/render_config";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { SceneData } from "../../core/entityObject/scene/SceneData";
import { CameraControllerData } from "../../component/camera/CameraControllerData";
import { CameraData } from "../../component/camera/CameraData";
import { DeviceManagerWorkerData } from "../worker/both_file/device/DeviceManagerWorkerData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { RenderCommandBufferData } from "../command/RenderCommandBufferData";
import { ERenderWorkerState } from "../worker/both_file/ERenderWorkerState";
import { SendDrawRenderCommandData } from "../worker/logic_file/draw/SendDrawRenderCommandData";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { clear, draw } from "../draw/DrawRenderCommandSystem";
import { DrawRenderCommandData } from "../draw/DrawRenderCommandData";
import { ProgramData } from "../shader/program/ProgramData";
import { LocationData } from "../shader/location/LocationData";
import { GLSLSenderData } from "../shader/glslSender/GLSLSenderData";
import { buildDrawDataMap } from "../utils/draw/drawRenderCommandUtils";

export var init = null;

export var render = null;

if(isSupportRenderWorkerAndSharedArrayBuffer()){
    init = (state: Map<any, any>) => {
        var renderWorker = DeviceManagerWorkerData.renderWorker;

        renderWorker.postMessage({
            operateType:EWorkerOperateType.INIT_MATERIAL_GEOMETRY,
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

            SendDrawRenderCommandData.state = ERenderWorkerState.INIT_COMPLETE;
        };

        return state;
    }

    render = (state: Map<any, any>) => {
        if(SendDrawRenderCommandData.state !== ERenderWorkerState.INIT_COMPLETE){
            return state;
        }

        return compose(
            sendDrawData(DeviceManagerWorkerData, MaterialData, GeometryData),
            // sortRenderCommands(state),
            createRenderCommandBuffer(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }

    let _initData = (SendDrawRenderCommandData:any) => {
        SendDrawRenderCommandData.state = ERenderWorkerState.DEFAULT;
    }

    _initData(SendDrawRenderCommandData);
}
else{
    init = (state: Map<any, any>) => {
        initMaterial(state, MaterialData);
    }

    render = (state: Map<any, any>) => {
        return compose(
            // draw(null, render_config, DeviceManagerData, MaterialData, ShaderData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandData),
            draw(null, render_config, buildDrawDataMap(DeviceManagerData, MaterialData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandData)),
            clear(null, render_config, DeviceManagerData),
            // sortRenderCommands(state),
            createRenderCommandBuffer(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }
}
