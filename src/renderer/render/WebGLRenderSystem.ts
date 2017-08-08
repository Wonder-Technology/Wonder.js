import { Map } from "immutable";
import { getRenderList } from "../../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../../component/renderer/MeshRendererData";
import { compose } from "../../utils/functionalUtils";
import { createRenderCommandBufferData } from "../command_buffer/RenderCommandBufferSystem";
import { sendDrawData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { init as initMaterial } from "../../component/material/MaterialSystem";
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
import { RenderCommandBufferData } from "../command_buffer/RenderCommandBufferData";
import { SendDrawRenderCommandBufferData } from "../worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { clearColor } from "../draw/DrawRenderCommandBufferSystem";
import { DrawRenderCommandBufferData } from "../draw/DrawRenderCommandBufferData";
import { ProgramData } from "../shader/program/ProgramData";
import { LocationData } from "../shader/location/LocationData";
import { GLSLSenderData } from "../shader/glslSender/GLSLSenderData";
import { buildDrawDataMap } from "../utils/draw/drawRenderCommandBufferUtils";
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
import { PointLightData } from "../../component/light/PointLightData";
import {
    getAmbientLightBufferCount, getDirectionLightBufferCount,
    getPointLightBufferCount
} from "../utils/light/bufferUtils";
import { TextureData } from "../texture/TextureData";
import { MapManagerData } from "../texture/MapManagerData";
import { TextureCacheData } from "../texture/TextureCacheData";
import { convertSourceMapToSrcIndexArr, getUniformSamplerNameMap } from "../texture/TextureSystem";
import {
    getDiffuseMapMap, getSpecularMapMap
} from "../../component/material/LightMaterialSystem";
import { GPUDetector } from "../device/GPUDetector";
import { GBufferData } from "../webgl2/defer/gbuffer/GBufferData";
import { init as initDefer, draw as deferDraw  } from "../webgl2/defer/DeferShadingSystem";
import { buildInitShaderDataMap } from "../utils/material/materialUtils";
import { DeferLightPassData } from "../webgl2/defer/light/DeferLightPassData";
import { ShaderData } from "../shader/ShaderData";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../webgl2/defer/draw/DeferDrawRenderCommandBufferSystem";
import { initMaterialShader as initMaterialShaderWebGL2, initNoMaterialShader as initNoMaterialShaderWebGL2 } from "../webgl2/shader/ShaderSystem";
import {
    draw as frontDraw
    // init as initFront
} from "../webgl1/front/FrontRenderSystem";
import { webgl1_shaderLib_generator } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { webgl2_shaderLib_generator } from "../webgl2/data/shaderLib_generator";
import { webgl1_material_config } from "../worker/webgl1/both_file/data/material_config";
import { webgl2_material_config } from "../webgl2/data/material_config";
import { initMaterialShader as initMaterialShaderWebGL1,   initNoMaterialShader as initNoMaterialShaderWebGL1  } from "../webgl1/shader/ShaderSystem";
import { isWebgl1 } from "../device/WebGLDetectSystem";
import { Log } from "../../utils/Log";

export var init = null;

export var render = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    if(isWebgl1()){
        init = (state: Map<any, any>) => {
            var renderWorker = getRenderWorker(WorkerInstanceData);

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
                        index: LightMaterialData.index,
                        diffuseMapMap: getDiffuseMapMap(LightMaterialData),
                        specularMapMap: getSpecularMapMap(LightMaterialData)
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
                lightData: {
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
                        buffer: PointLightData.buffer,
                        bufferCount: getPointLightBufferCount(),
                        lightCount: PointLightData.count,
                        pointLightGLSLDataStructureMemberNameArr: PointLightData.lightGLSLDataStructureMemberNameArr
                    }
                },
                textureData: {
                    mapManagerBuffer: MapManagerData.buffer,
                    textureBuffer: TextureData.buffer,
                    index: TextureData.index,
                    imageSrcIndexArr: convertSourceMapToSrcIndexArr(TextureData),
                    uniformSamplerNameMap: getUniformSamplerNameMap(TextureData)
                }
            });

            renderWorker.onmessage = (e) => {
                var data = e.data,
                    state = data.state;

                SendDrawRenderCommandBufferData.state = state;
            };

            return state;
        }

        render = (state: Map<any, any>) => {
            return compose(
                sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
    else{
        //todo
    }
}
else {
    if(isWebgl1()){
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initMaterial(state, gl, webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, TextureData, MaterialData, BasicMaterialData, LightMaterialData);

            //initFront(gl, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                //todo refactor defer draw, draw(clear, draw...  consider webgl2)
                //todo filter gameObjects by material: only light material use defer draw, basic material use basic draw(front draw?)
                frontDraw(null, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData), ThreeDTransformData, GameObjectData),
                clearColor(null, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
    else{
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);


            initState(state, getGL, setSide, DeviceManagerData);

            initMaterial(state, gl, webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, TextureData, MaterialData, BasicMaterialData, LightMaterialData);

            if(!GPUDetector.getInstance().extensionColorBufferFloat){
                Log.error(true, "defer shading need support extensionColorBufferFloat extension");
            }
            else{
                initDefer(gl, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
            }
        }

        render = (state: Map<any, any>) => {
            return compose(
                //todo filter gameObjects by material: only light material use defer draw, basic material use basic draw(front draw?)
                deferDraw(null, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData), buildDeferDrawDataMap(GBufferData, DeferLightPassData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData)),
                clearColor(null, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
}
