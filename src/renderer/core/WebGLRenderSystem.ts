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
import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { WorkerInstanceData } from "../../worker/WorkerInstanceData";
import { BasicMaterialData } from "../../component/material/BasicMaterialData";
import { LightMaterialData } from "../../component/material/LightMaterialData";
import { GlobalTempData } from "../../definition/GlobalTempData";
import { AmbientLightData } from "../../component/light/AmbientLightData";
import { getGL, setSide } from "../device/DeviceManagerSystem";
import { initState } from "../utils/worker/render_file/state/stateUtils";
import {
    getAmbientLightBufferCount, getDirectionLightBufferCount,
    getPointLightBufferCount
} from "../utils/light/bufferUtils";
import { TextureData } from "../texture/TextureData";
import { MapManagerData } from "../texture/MapManagerData";
import { TextureCacheData } from "../texture/TextureCacheData";
import { convertSourceMapToSrcIndexArr, getUniformSamplerNameMap } from "../texture/TextureSystem";
import { GBufferData } from "../webgl2/render/light/defer/gbuffer/GBufferData";
import { buildInitShaderDataMap } from "../utils/worker/render_file/material/materialUtils";
import { initMaterialShader as initMaterialShaderWebGL2, initNoMaterialShader as initNoMaterialShaderWebGL2 } from "../webgl2/shader/ShaderSystem";
import { webgl1_shaderLib_generator } from "../worker/webgl1/both_file/data/shaderLib_generator";
import { webgl2_shaderLib_generator } from "../worker/webgl2/both_file/data/shaderLib_generator";
import { webgl1_material_config } from "../worker/webgl1/both_file/data/material_config";
import { webgl2_material_config } from "../worker/webgl2/both_file/data/material_config";
import { initMaterialShader as initMaterialShaderWebGL1, initNoMaterialShader as initNoMaterialShaderWebGL1 } from "../webgl1/shader/ShaderSystem";
import { isWebgl1 } from "../device/WebGLDetectSystem";
import { buildDrawDataMap as buildDeferDrawDataMap } from "../webgl2/utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { WebGL1PointLightData } from "../webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../webgl2/light/PointLightData";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { init as initWebGL2Material } from "../../component/webgl2/material/MaterialSystem";
import { init as initWebGL1Material } from "../../component/webgl1/material/MaterialSystem";
import { GPUDetectData } from "../device/GPUDetectData";
import { BasicRenderCommandBufferData } from "../command_buffer/BasicRenderCommandBufferData";
import { LightRenderCommandBufferData } from "../command_buffer/LightRenderCommandBufferData";
import { BasicDrawRenderCommandBufferData } from "../draw/basic/BasicDrawRenderCommandBufferData";
import { LightDrawRenderCommandBufferData } from "../draw/light/LightDrawRenderCommandBufferData";
import { clearColor } from "../draw/DrawRenderCommandBufferSystem";
import { createRenderCommandBufferData as createRenderCommandBufferWorkerData } from "../worker/logic_file/command_buffer/RenderCommandBufferSystem";
import { render as renderWebGL2, init as initWebGL2Render } from "../webgl2/render/RenderSystem";
import { render as renderWebGL1 } from "../webgl1/render/RenderSystem";
import { WebGL2RenderInitWorkerData } from "../webgl2/type/messageDataType";
import { getLightMaterialBufferStartIndex } from "../utils/material/bufferUtils";
import { getBasicMaterialBufferStartIndex } from "../utils/material/bufferUtils";
import { WebGL2GLSLSenderData } from "../webgl2/shader/glslSender/GLSLSenderData";
import { WebGL1GLSLSenderData } from "../webgl1/shader/glslSender/GLSLSenderData";
import { WebGL1ProgramData } from "../webgl1/shader/program/ProgramData";
import { WebGL2ProgramData } from "../webgl2/shader/program/ProgramData";
import { buildDrawDataMap as buildWebGL2DrawDataMap } from "../webgl2/utils/worker/render_file/render/renderUtils";
import { VaoData } from "../vao/VaoData";
import { buildDrawDataMap as buildWebGL1DrawDataMap } from "../webgl1/utils/worker/render_file/render/renderUtils";
import { WebGL1LocationData } from "../webgl1/shader/location/LocationData";
import { WebGL2LocationData } from "../webgl2/shader/location/LocationData";
import { WebGL1ShaderData } from "../webgl1/shader/ShaderData";
import { WebGL2ShaderData } from "../webgl2/shader/ShaderData";
import { WebGL1DirectionLightData } from "../webgl1/light/DirectionLightData";
import { WebGL2DirectionLightData } from "../webgl2/light/DirectionLightData";
import { DeferDirectionLightPassData } from "../webgl2/render/light/defer/light/DeferDirectionLightPassData";
import { DeferPointLightPassData } from "../webgl2/render/light/defer/light/DeferPointLightPassData";
import { DeferAmbientLightPassData } from "../webgl2/render/light/defer/light/DeferAmbientLightPassData";

var _checkLightCount = requireCheckFunc((ambientLightCount: number, directionLightCount: number, pointLightCount: number, AmbientLightData: any, DirectionLightData: any, PointLightData: any) => {
    it("count should <= max count", () => {
        expect(AmbientLightData.count).lte(ambientLightCount);
        expect(DirectionLightData.count).lte(directionLightCount);
        expect(PointLightData.count).lte(pointLightCount);
    })
}, () => {
})

export var init = null;

export var render = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    if (isWebgl1()) {
        init = (state: Map<any, any>) => {
            _checkLightCount(DataBufferConfig.frontAmbientLightCount, DataBufferConfig.frontDirectionLightCount, DataBufferConfig.frontDirectionLightCount, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData);

            return _init(state, {
                ambientLightData: {
                    buffer: AmbientLightData.buffer,
                    bufferCount: getAmbientLightBufferCount(),
                    lightCount: AmbientLightData.count

                },
                directionLightData: {
                    buffer: WebGL1DirectionLightData.buffer,
                    bufferCount: getDirectionLightBufferCount(),
                    lightCount: WebGL1DirectionLightData.count,
                    directionLightGLSLDataStructureMemberNameArr: WebGL1DirectionLightData.lightGLSLDataStructureMemberNameArr
                },
                pointLightData: {
                    buffer: WebGL1PointLightData.buffer,
                    bufferCount: getPointLightBufferCount(),
                    lightCount: WebGL1PointLightData.count,
                    pointLightGLSLDataStructureMemberNameArr: WebGL1PointLightData.lightGLSLDataStructureMemberNameArr
                }
            },
                null);
        }

        render = (state: Map<any, any>) => {
            _render(state, WebGL1DirectionLightData, WebGL1PointLightData);
        }

    }
    else {
        init = (state: Map<any, any>) => {
            _checkLightCount(DataBufferConfig.deferAmbientLightCount, DataBufferConfig.deferDirectionLightCount, DataBufferConfig.deferPointLightCount, AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData);


            return _init(state, {
                directionLightData: {
                    buffer: WebGL2DirectionLightData.buffer,
                    bufferCount: getDirectionLightBufferCount(),
                    lightCount: WebGL2DirectionLightData.count
                },
                pointLightData: {
                    buffer: WebGL2PointLightData.buffer,
                    bufferCount: getPointLightBufferCount(),
                    lightCount: WebGL2PointLightData.count
                },
            },
                {
                    deferShading: {
                        isInit: true
                    }
                }
            );
        }

        render = (state: Map<any, any>) => {
            _render(state, WebGL2DirectionLightData, WebGL2PointLightData);
        }
    }

    let _init = (state: Map<any, any>, lightData: any, renderData: WebGL2RenderInitWorkerData) => {
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
            renderData: renderData
        });

        renderWorker.onmessage = (e) => {
            var data = e.data,
                state = data.state;

            SendDrawRenderCommandBufferData.state = state;
        };

        return state;
    };

    let _render = (state: Map<any, any>, DirectionLightData, PointLightData: any) => {
        return compose(
            sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, PointLightData),
            // sortRenderCommands(state),
            createRenderCommandBufferWorkerData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
            getRenderList(state)
        )(MeshRendererData)
    }
}
else {
    if (isWebgl1()) {
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initWebGL1Material(state, gl, webgl1_material_config, webgl1_shaderLib_generator, initNoMaterialShaderWebGL1, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData, WebGL1GLSLSenderData, WebGL1ProgramData, VaoData, WebGL1LocationData, WebGL1ShaderData);

            _checkLightCount(DataBufferConfig.frontAmbientLightCount, DataBufferConfig.frontDirectionLightCount, DataBufferConfig.frontPointLightCount, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData);
        };

        render = (state: Map<any, any>) => {
            return compose(
                renderWebGL1(state, render_config, webgl1_material_config, webgl1_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL1, buildWebGL1DrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData, WebGL1ProgramData, WebGL1LocationData, WebGL1GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData), buildInitShaderDataMap(DeviceManagerData, WebGL1ProgramData, WebGL1LocationData, WebGL1GLSLSenderData, WebGL1ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData, GPUDetectData, VaoData), ThreeDTransformData, GameObjectData),
                clearColor(state, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
    else {
        init = (state: Map<any, any>) => {
            var gl = getGL(DeviceManagerData, state);

            initState(state, getGL, setSide, DeviceManagerData);

            initWebGL2Material(state, gl, webgl2_material_config, webgl2_shaderLib_generator, initNoMaterialShaderWebGL2, TextureData, MaterialData, BasicMaterialData, LightMaterialData, GPUDetectData, WebGL2GLSLSenderData, WebGL2ProgramData, VaoData, WebGL2LocationData, WebGL2ShaderData);

            initWebGL2Render(gl, render_config, DataBufferConfig, GBufferData, DeferAmbientLightPassData, DeferDirectionLightPassData, DeferPointLightPassData, WebGL2ShaderData, WebGL2ProgramData, WebGL2LocationData, WebGL2GLSLSenderData, GPUDetectData);

            _checkLightCount(DataBufferConfig.deferAmbientLightCount, DataBufferConfig.deferDirectionLightCount, DataBufferConfig.deferPointLightCount, AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData);
        }

        render = (state: Map<any, any>) => {
            return compose(
                renderWebGL2(state, render_config, webgl2_material_config, webgl2_shaderLib_generator, DataBufferConfig, initMaterialShaderWebGL2, buildWebGL2DrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData, WebGL2ProgramData, WebGL2LocationData, WebGL2GLSLSenderData, GeometryData, BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData), buildDeferDrawDataMap(GBufferData, DeferAmbientLightPassData, DeferDirectionLightPassData, DeferPointLightPassData), buildInitShaderDataMap(DeviceManagerData, WebGL2ProgramData, WebGL2LocationData, WebGL2GLSLSenderData, WebGL2ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData, GPUDetectData, VaoData), ThreeDTransformData, GameObjectData),
                clearColor(state, render_config, DeviceManagerData),
                // sortRenderCommands(state),
                createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, LightRenderCommandBufferData),
                getRenderList(state)
            )(MeshRendererData)
        }
    }
}
