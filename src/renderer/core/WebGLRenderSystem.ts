import { Map } from "immutable";
import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommandBufferData } from "../command_buffer/RenderCommandBufferSystem";
import { sendDrawData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { MaterialData } from "../../component/material/MaterialData";
import { GameObjectData } from "../../core/entityObject/gameObject/GameObjectData";
import { GeometryData } from "../../component/geometry/GeometryData";
import { ArrayBufferData } from "../buffer/ArrayBufferData";
import { IndexBufferData } from "../buffer/IndexBufferData";
import { render_config } from "../worker/both_file/data/render_config";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { ThreeDTransformData } from "../../component/transform/ThreeDTransformData";
import { SceneData } from "../../core/entityObject/scene/SceneData";
import { CameraControllerData } from "../../component/camera/CameraControllerData";
import { CameraData } from "../../component/camera/CameraData";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { SendDrawRenderCommandBufferData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { ProgramData } from "../shader/program/ProgramData";
import { LocationData } from "../shader/location/LocationData";
import { GLSLSenderData } from "../shader/glslSender/GLSLSenderData";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { BasicMaterialData } from "../../component/material/BasicMaterialData";
import { LightMaterialData } from "../../component/material/LightMaterialData";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { AmbientLightData } from "../../component/light/AmbientLightData";
import { DirectionLightData } from "../../component/light/DirectionLightData";
import { getGL, setSide } from "../device/DeviceManagerSystem";
import {
    getBasicMaterialBufferStartIndex,
    getLightMaterialBufferStartIndex
} from "../utils/material/bufferUtils";
import { initState } from "../utils/state/stateUtils";
import {
    getAmbientLightBufferCount, getDirectionLightBufferCount,
    getPointLightBufferCount
} from "../utils/light/bufferUtils";
import { TextureData } from "../texture/TextureData";
import { MapManagerData } from "../texture/MapManagerData";
import { TextureCacheData } from "../texture/TextureCacheData";
import { convertSourceMapToSrcIndexArr, getUniformSamplerNameMap } from "../texture/TextureSystem";
import { GBufferData } from "../webgl2/render/light/defer/gbuffer/GBufferData";
import { buildInitShaderDataMap } from "../utils/material/materialUtils";
import { DeferLightPassData } from "../webgl2/render/light/defer/light/DeferLightPassData";
import { ShaderData } from "../shader/ShaderData";
import { initMaterialShader as initMaterialShaderWebGL2, initNoMaterialShader as initNoMaterialShaderWebGL2 } from "../webgl2/shader/ShaderSystem";
import { webgl1_shaderLib_generator } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { webgl2_shaderLib_generator } from "../worker/webgl2/both_file/data/shaderLib_generator";
import { webgl1_material_config } from "../worker/webgl1/both_file/data/material_config";
import { webgl2_material_config } from "../worker/webgl2/both_file/data/material_config";
import { initMaterialShader as initMaterialShaderWebGL1,   initNoMaterialShader as initNoMaterialShaderWebGL1  } from "../webgl1/shader/ShaderSystem";
import { isWebgl1 } from "../device/WebGLDetectSystem";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../webgl2/utils/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { WebGL1PointLightData } from "../webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../webgl2/light/PointLightData";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { init as initWebGL2Material } from "../../component/webgl2/material/MaterialSystem";
import { init as initWebGL1Material } from "../../component/webgl1/material/MaterialSystem";
import { GPUDetectData } from "../device/GPUDetectData";
import { BasicRenderCommandBufferData } from "../command_buffer/BasicRenderCommandBufferData";
import { LightRenderCommandBufferData } from "../command_buffer/LightRenderCommandBufferData";
import { buildDrawDataMap } from "../utils/render/renderUtils";
import { BasicDrawRenderCommandBufferData } from "../draw/basic/BasicDrawRenderCommandBufferData";
import { LightDrawRenderCommandBufferData } from "../draw/light/LightDrawRenderCommandBufferData";
import { clearColor } from "../draw/DrawRenderCommandBufferSystem";
import { createRenderCommandBufferData as createRenderCommandBufferWorkerData } from "../worker/logic_file/command_buffer/RenderCommandBufferSystem";
import { render as webgl2Render, init as initWebGL2Render } from "../webgl2/render/RenderSystem";
import { render as webgl1Render } from "../webgl1/render/RenderSystem";

var _checkLightCount = requireCheckFunc((PointLightData: any) => {
    it("count should <= max count", () => {
        expect(PointLightData.count).lte(DataBufferConfig.pointLightDataBufferCount);
    })
    //todo check direction, ambient
}, () => {
})

export var init = null;

export var render = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    if(isWebgl1()){
        init = (state: Map<any, any>) => {
            return _init(state, {
                ambientLightData: {
                    buffer: AmbientLightData.buffer,
                    bufferCount: getAmbientLightBufferCount(),
                    lightCount: AmbientLightData.count

                },
                directionLightData: {
                    buffer: DirectionLightData.buffer,
                    bufferCount: getDirectionLightBufferCount(),
                    lightCount: DirectionLightData.count,
                    directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
                },
                pointLightData: {
                    buffer: WebGL1PointLightData.buffer,
                    bufferCount: getPointLightBufferCount(),
                    lightCount: WebGL1PointLightData.count,
                    pointLightGLSLDataStructureMemberNameArr: WebGL1PointLightData.lightGLSLDataStructureMemberNameArr
                }
            },  WebGL1PointLightData);
        }

        render = (state: Map<any, any>) => {
            _render(state, WebGL1PointLightData);
        }

    }
    // else{
    //     init = (state: Map<any, any>) => {
    //         return _init(state, {
    //                 pointLightData: {
    //                     buffer: WebGL2PointLightData.buffer,
    //                     bufferCount: getPointLightBufferCount(),
    //                     lightCount: WebGL2PointLightData.count
    //                 }
    //             },  WebGL2PointLightData);
    //     }
    //
    //     render = (state: Map<any, any>) => {
    //         _render(state, WebGL2PointLightData);
    //     }
    // }

    let _init = (state: Map<any, any>, lightData:any, PointLightData:any) => {
        _checkLightCount(PointLightData);

        let renderWorker = getRenderWorker(WorkerInstanceData);

        renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
            materialData: {
                buffer: MaterialData.buffer,
                basicMaterialData: {
                    startIndex: getBasicMaterialBufferStartIndex(),
                    index: BasicMaterialData.index
                },
                lightMaterialData: {
                    startIndex: getLightMaterialBufferStartIndex(),
                    index: LightMaterialData.index
                }
            },
            geometryData: {
                buffer: GeometryData.buffer,
                indexType: GeometryData.indexType,
                indexTypeSize: GeometryData.indexTypeSize,
                verticesInfoList: GeometryData.verticesInfoList,
                normalsInfoList: GeometryData.normalsInfoList,
                texCoordsInfoList: GeometryData.texCoordsInfoList,
                indicesInfoList: GeometryData.indicesInfoList
            },
            lightData: lightData,
            textureData: {
                mapManagerBuffer: MapManagerData.buffer,
                textureBuffer: TextureData.buffer,
                index: TextureData.index,
                imageSrcIndexArr: convertSourceMapToSrcIndexArr(TextureData),
                uniformSamplerNameMap: getUniformSamplerNameMap(TextureData)
            },
            renderData: null
        });

        renderWorker.onmessage = (e) => {
            var data = e.data,
                state = data.state;

            SendDrawRenderCommandBufferData.state = state;
        };

        return state;
    };

    let _render = (state: Map<any, any>, PointLightData:any) => {
        return compose(
            sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, PointLightData),
            // sortRenderCommands(state),
            createRenderCommandBufferWorkerData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }
}
else {
    if(isWebgl1()){
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initWebGL1Material(state, gl, webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData);

            _checkLightCount(WebGL1PointLightData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                webgl1Render(null, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, WebGL1PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, WebGL1PointLightData, GPUDetectData), ThreeDTransformData, GameObjectData),
                clearColor(null, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
    else{
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initWebGL2Material(state, gl, webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData);

            initWebGL2Render(gl, DataBufferConfig, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData, GPUDetectData);

            _checkLightCount(WebGL2PointLightData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                webgl2Render(null, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, WebGL2PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData), buildDeferDrawDataMap(GBufferData, DeferLightPassData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, WebGL2PointLightData, GPUDetectData), ThreeDTransformData, GameObjectData),
                clearColor(null, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
}
