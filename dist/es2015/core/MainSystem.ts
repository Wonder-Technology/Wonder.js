import { GeometryData } from "../component/geometry/GeometryData";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { GlobalTempData } from "../definition/GlobalTempData";
import { initData as initSceneData } from "./entityObject/scene/SceneSystem";
import {
    initData as initThreeDTransformData
} from "../component/transform/ThreeDTransformSystem";
import {
    initData as initGeometryData
} from "../component/geometry/GeometrySystem";
import { DataBufferConfig } from "../config/DataBufferConfig";
import {
    initData as initMaterialData
} from "../component/material/MaterialSystem";
import { MaterialData } from "../component/material/MaterialData";
import {
    initData as initMeshRendererData
} from "../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../component/renderer/MeshRendererData";
import { initData as initTagData } from "../component/tag/TagSystem";
import { TagData } from "../component/tag/TagData";
import { SceneData } from "./entityObject/scene/SceneData";
import { initData as initCameraControllerData } from "../component/camera/CameraControllerSystem";
import { initData as initGameObjectData } from "./entityObject/gameObject/GameObjectSystem";
// import { initData as initWorkerTimeData } from "../renderer/worker/logic_file/core/WorkerTimeSystem";
// import { WorkerTimeData } from "../renderer/worker/logic_file/core/WorkerTimeData";
import { initData as initRenderCommandBufferData } from "../renderer/command_buffer/RenderCommandBufferSystem";
import { initData as initProgramData } from "../renderer/shader/program/ProgramSystem";
import { initData as initArrayBufferData } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferData } from "../renderer/buffer/IndexBufferSystem";
import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../renderer/device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { chain, compose } from "../utils/functionalUtils";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { fromJS, Map } from "immutable";
import { createCanvas, initDevice } from "../renderer/device/initDeviceSystem";
import { isSupportRenderWorkerAndSharedArrayBuffer, setWorkerConfig } from "../device/WorkerDetectSystem";
import { IndexBufferData } from "../renderer/buffer/IndexBufferData";
import { ArrayBufferData } from "../renderer/buffer/ArrayBufferData";
import { BasicMaterialData } from "../component/material/BasicMaterialData";
import { LightMaterialData } from "../component/material/LightMaterialData";
// import { initData as initLightData } from "../component/light/LightSystem";
import { AmbientLightData } from "../component/light/AmbientLightData";
import { setIsTest, setLibIsTest } from "../renderer/config/InitConfigSystem";
import { getRenderWorker, initWorkInstances } from "../worker/WorkerInstanceSystem";
import { TextureCacheData } from "../renderer/texture/TextureCacheData";
import { TextureData } from "../renderer/texture/TextureData";
import { MapManagerData } from "../renderer/texture/MapManagerData";
import { initData as initSendDrawRenderCommandBufferData } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferDataSystem";
import { SendDrawRenderCommandBufferData } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData";
import { EWorkerOperateType } from "../renderer/worker/both_file/EWorkerOperateType";
import { getVersion, isWebgl1 } from "../renderer/device/WebGLDetectSystem";
import { WebGL1PointLightData } from "../renderer/webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../renderer/webgl2/light/PointLightData";
import { initData as initDirectorData } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { initData as initWebGL1LightData } from "../component/webgl1/light/LightSystem";
import { initData as initWebGL2LightData } from "../component/webgl2/light/LightSystem";
import { GPUDetectData } from "../renderer/device/GPUDetectData";
import { detect as detectWebGL1 } from "../renderer/webgl1/device/GPUDetectSystem";
import { detect as detectWebGL2 } from "../renderer/webgl2/device/GPUDetectSystem";
import { BasicRenderCommandBufferData } from "../renderer/command_buffer/BasicRenderCommandBufferData";
import { LightRenderCommandBufferData } from "../renderer/command_buffer/LightRenderCommandBufferData";
import { BasicDrawRenderCommandBufferData } from "../renderer/draw/basic/BasicDrawRenderCommandBufferData";
import { LightDrawRenderCommandBufferData } from "../renderer/draw/light/LightDrawRenderCommandBufferData";
import { initData as initDrawRenderCommandBufferData } from "../renderer/draw/DrawRenderCommandBufferSystem";
import { initData as initWebGL2GLSLSenderData } from "../renderer/webgl2/shader/glslSender/GLSLSenderSystem";
import { WebGL2GLSLSenderData } from "../renderer/webgl2/shader/glslSender/GLSLSenderData";
import { initData as initWebGL1GLSLSenderData } from "../renderer/webgl1/shader/glslSender/GLSLSenderSystem";
import { WebGL1GLSLSenderData } from "../renderer/webgl1/shader/glslSender/GLSLSenderData";
import { WebGL1ProgramData } from "../renderer/webgl1/shader/program/ProgramData";
import { WebGL2ProgramData } from "../renderer/webgl2/shader/program/ProgramData";
import { initData as initVaoData } from "../renderer/webgl2/vao/VaoSystem";
import { VaoData } from "../renderer/vao/VaoData";
import { WebGL1LocationData } from "../renderer/webgl1/shader/location/LocationData";
import { WebGL2LocationData } from "../renderer/webgl2/shader/location/LocationData";
import { initData as initWebGL1LocationData } from "../renderer/webgl1/shader/location/LocationSystem";
import { initData as initWebGL2LocationData } from "../renderer/webgl2/shader/location/LocationSystem";
import { initData as initWebGL1ShaderData } from "../renderer/webgl1/shader/ShaderSystem";
import { initData as initWebGL2ShaderData } from "../renderer/webgl2/shader/ShaderSystem";
import { WebGL1ShaderData } from "../renderer/webgl1/shader/ShaderData";
import { WebGL2ShaderData } from "../renderer/webgl2/shader/ShaderData";
import { initData as initDeferLightPassData } from "../renderer/webgl2/render/light/defer/light/DeferLightPassSystem";
import { WebGL2DirectionLightData } from "../renderer/webgl2/light/DirectionLightData";
import { WebGL1DirectionLightData } from "../renderer/webgl1/light/DirectionLightData";
import { DeferDirectionLightPassData } from "../renderer/webgl2/render/light/defer/light/DeferDirectionLightPassData";
import { DeferPointLightPassData } from "../renderer/webgl2/render/light/defer/light/DeferPointLightPassData";
import { DeferAmbientLightPassData } from "../renderer/webgl2/render/light/defer/light/DeferAmbientLightPassData";

export var setConfig = (closeContractTest: boolean, InitConfigData: any, WorkerDetectData: any, WorkerInstanceData: any, WebGLDetectData:any, {
    canvasId = "",
    isTest = DebugConfig.isTest,
    screenSize = EScreenSize.FULL,
    useDevicePixelRatio = false,
    contextConfig = {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    },
    workerConfig = {
        renderWorkerFileDir: "/Wonder.js/dist/worker/"
    }
}) => {
    return IO.of(() => {
        var _isTest = false;

        if (CompileConfig.closeContractTest) {
            _isTest = false;
            setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            setLibIsTest(isTest).run();
        }

        setWorkerConfig(workerConfig, WorkerDetectData).run();

        initWorkInstances(WorkerInstanceData);

        setIsTest(_isTest, InitConfigData, WorkerInstanceData).run();

        passDataToRenderWorker(WorkerInstanceData, WebGLDetectData).run();

        return fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils.extend({
                        alpha: true,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: true,
                        preserveDrawingBuffer: false
                    }, contextConfig.options)
                },
                useDevicePixelRatio: useDevicePixelRatio
            }
        });
    });
}

export var initData = null;

export var passDataToRenderWorker = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initData = () => {
        _initData();
    }

    passDataToRenderWorker = (WorkerInstanceData:any, WebGLDetectData:any) => {
        return IO.of(() => {
            var renderWorker = getRenderWorker(WorkerInstanceData);

            renderWorker.postMessage({
                operateType: EWorkerOperateType.INIT_DATA,
                webglVersion: getVersion(WebGLDetectData)
            });
        });
    }
}
else {
    if(isWebgl1()){
        initData = () => {
            _initData();

            initProgramData(WebGL1ProgramData);

            initWebGL1LocationData(WebGL1LocationData);

            initArrayBufferData(ArrayBufferData);

            initIndexBufferData(IndexBufferData);

            initDrawRenderCommandBufferData(BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData);
        }

    }
    else{
        initData = () => {
            _initData();

            initProgramData(WebGL2ProgramData);

            initWebGL2LocationData(WebGL2LocationData);

            initDrawRenderCommandBufferData(BasicDrawRenderCommandBufferData, LightDrawRenderCommandBufferData);
        }
    }

    passDataToRenderWorker = (WorkerInstanceData:any, WebGLDetectData:any) => {
        return IO.of(() => {
        });
    }
}

export var init = null;

var _initData = null;

if(isWebgl1()){
    _initData = () => {
        initDirectorData(DirectorData);

        initWebGL1ShaderData(WebGL1ShaderData);

        initGeometryData(DataBufferConfig, GeometryData, GPUDetectData);

        initMaterialData(TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData);

        initMeshRendererData(MeshRendererData);

        initTagData(TagData);

        initThreeDTransformData(GlobalTempData, ThreeDTransformData);

        initSceneData(SceneData);

        initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);

        initGameObjectData(GameObjectData);

        // initWorkerTimeData(WorkerTimeData);

        initRenderCommandBufferData(DataBufferConfig, BasicRenderCommandBufferData, LightRenderCommandBufferData);

        initWebGL1LightData(AmbientLightData, WebGL1DirectionLightData, WebGL1PointLightData);

        initSendDrawRenderCommandBufferData(SendDrawRenderCommandBufferData);

        initWebGL1GLSLSenderData(WebGL1GLSLSenderData);

        initVaoData(VaoData);
    }

    init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
        it("should set config before", () => {
            expect(configState.get("useDevicePixelRatio")).exist;
        })
    }, (gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
        return compose(
            chain(initDevice(configState.get("contextConfig"), gameState, configState, detectWebGL1, DomQuery)),
            createCanvas(DomQuery)
        )(configState.get("canvasId"));
    });
}
else{
    _initData = () => {
        initDirectorData(DirectorData);

        initWebGL2ShaderData(WebGL2ShaderData);

        initGeometryData(DataBufferConfig, GeometryData, GPUDetectData);

        initMaterialData(TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData);

        initMeshRendererData(MeshRendererData);

        initTagData(TagData);

        initThreeDTransformData(GlobalTempData, ThreeDTransformData);

        initSceneData(SceneData);

        initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);

        initGameObjectData(GameObjectData);

        // initWorkerTimeData(WorkerTimeData);

        initRenderCommandBufferData(DataBufferConfig, BasicRenderCommandBufferData, LightRenderCommandBufferData);

        initWebGL2LightData(AmbientLightData, WebGL2DirectionLightData, WebGL2PointLightData);

        initSendDrawRenderCommandBufferData(SendDrawRenderCommandBufferData);

        initWebGL2GLSLSenderData(WebGL2GLSLSenderData);

        initVaoData(VaoData);

        initDeferLightPassData(DeferAmbientLightPassData, DeferDirectionLightPassData, DeferPointLightPassData);
    }

    init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
        it("should set config before", () => {
            expect(configState.get("useDevicePixelRatio")).exist;
        })
    }, (gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
        return compose(
            chain(initDevice(configState.get("contextConfig"), gameState, configState, detectWebGL2, DomQuery)),
            createCanvas(DomQuery)
        )(configState.get("canvasId"));
    });
}
