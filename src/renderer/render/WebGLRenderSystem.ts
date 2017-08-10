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
import {
    getAmbientLightBufferCount, getDirectionLightBufferCount,
    getPointLightBufferCount
} from "../utils/light/bufferUtils";
import { TextureData } from "../texture/TextureData";
import { MapManagerData } from "../texture/MapManagerData";
import { TextureCacheData } from "../texture/TextureCacheData";
import { convertSourceMapToSrcIndexArr, getUniformSamplerNameMap } from "../texture/TextureSystem";
import { GBufferData } from "../webgl2/defer/gbuffer/GBufferData";
import { init as initDefer, draw as deferDraw  } from "../webgl2/defer/DeferShadingSystem";
import { buildInitShaderDataMap } from "../utils/material/materialUtils";
import { DeferLightPassData } from "../webgl2/defer/light/DeferLightPassData";
import { ShaderData } from "../shader/ShaderData";
import { initMaterialShader as initMaterialShaderWebGL2, initNoMaterialShader as initNoMaterialShaderWebGL2 } from "../webgl2/shader/ShaderSystem";
import {
    draw as frontDraw
    // init as initFront
} from "../webgl1/front/FrontRenderSystem";
import { webgl1_shaderLib_generator } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { webgl2_shaderLib_generator } from "../worker/webgl2/both_file/data/shaderLib_generator";
import { webgl1_material_config } from "../worker/webgl1/both_file/data/material_config";
import { webgl2_material_config } from "../worker/webgl2/both_file/data/material_config";
import { initMaterialShader as initMaterialShaderWebGL1,   initNoMaterialShader as initNoMaterialShaderWebGL1  } from "../webgl1/shader/ShaderSystem";
import { isWebgl1 } from "../device/WebGLDetectSystem";
import { Log } from "../../utils/Log";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../webgl2/utils/defer/draw/deferDrawRenderCommandBufferUtils";
import { WebGL1PointLightData } from "../webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../webgl2/light/PointLightData";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { init as initWebGL2Material } from "../../component/webgl2/material/MaterialSystem";
import { init as initWebGL1Material } from "../../component/webgl1/material/MaterialSystem";
import { getExtensionColorBufferFloat } from "../device/GPUDetectSystem";
import { GPUDetectData } from "../device/GPUDetectData";

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
            _checkLightCount(WebGL1PointLightData);

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
                        buffer: WebGL1PointLightData.buffer,
                        bufferCount: getPointLightBufferCount(),
                        lightCount: WebGL1PointLightData.count,
                        pointLightGLSLDataStructureMemberNameArr: WebGL1PointLightData.lightGLSLDataStructureMemberNameArr
                    }
                },
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
        }

        render = (state: Map<any, any>) => {
            return compose(
                sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, WebGL1PointLightData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }

    }
    else{
        //todo refactor(extract repeat code with webgl1)

        init = (state: Map<any, any>) => {
            _checkLightCount(WebGL2PointLightData);

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
                lightData: {
                    // ambientLightData: {
                    //     buffer: AmbientLightData.buffer,
                    //     bufferCount: getAmbientLightBufferCount(),
                    //     lightCount: AmbientLightData.count
                    //
                    // },
                    // directionLightData: {
                    //     buffer: DirectionLightData.buffer,
                    //     bufferCount: getDirectionLightBufferCount(),
                    //     lightCount: DirectionLightData.count,
                    //     directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
                    // },
                    pointLightData: {
                        buffer: WebGL2PointLightData.buffer,
                        bufferCount: getPointLightBufferCount(),
                        lightCount: WebGL2PointLightData.count
                        // pointLightGLSLDataStructureMemberNameArr: PointLightData.lightGLSLDataStructureMemberNameArr
                    }
                },
                textureData: {
                    mapManagerBuffer: MapManagerData.buffer,
                    textureBuffer: TextureData.buffer,
                    index: TextureData.index,
                    imageSrcIndexArr: convertSourceMapToSrcIndexArr(TextureData),
                    uniformSamplerNameMap: getUniformSamplerNameMap(TextureData)
                },
                renderData: {
                    deferShading:{
                        isInit: true
                    }
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
                sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, WebGL2PointLightData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
}
else {
    if(isWebgl1()){
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initWebGL1Material(state, gl, webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData);

            //initFront(gl, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);

            _checkLightCount(WebGL1PointLightData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                //todo refactor defer draw, draw(clear, draw...  consider webgl2)
                //todo filter gameObjects by material: only light material use defer draw, basic material use basic draw(front draw?)
                frontDraw(null, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, WebGL1PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, WebGL1PointLightData, GPUDetectData), ThreeDTransformData, GameObjectData),
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

            initWebGL2Material(state, gl, webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData);

            if(!getExtensionColorBufferFloat(GPUDetectData)){
                Log.error(true, "defer shading need support extensionColorBufferFloat extension");
            }
            else{
                initDefer(gl, DataBufferConfig, GBufferData, DeferLightPassData, ShaderData, ProgramData, LocationData, GLSLSenderData);
            }

            _checkLightCount(WebGL2PointLightData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                //todo filter gameObjects by material: only light material use defer draw, basic material use basic draw(front draw?)
                deferDraw(null, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, WebGL2PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData), buildDeferDrawDataMap(GBufferData, DeferLightPassData), buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, WebGL2PointLightData, GPUDetectData), ThreeDTransformData, GameObjectData),
                clearColor(null, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
}
