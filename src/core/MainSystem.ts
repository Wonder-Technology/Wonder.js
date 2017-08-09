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
import { initData as initShaderData } from "../renderer/shader/ShaderSystem";
import { ShaderData } from "../renderer/shader/ShaderData";
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
import { render_config } from "../renderer/worker/both_file/data/render_config";
import { RenderCommandBufferData } from "../renderer/command_buffer/RenderCommandBufferData";
import { initData as initProgramData } from "../renderer/shader/program/ProgramSystem";
import { initData as initLocationData } from "../renderer/shader/location/LocationSystem";
import { initData as initGLSLSenderData } from "../renderer/shader/glslSender/GLSLSenderSystem";
import { initData as initArrayBufferData } from "../renderer/buffer/ArrayBufferSystem";
import { initData as initIndexBufferData } from "../renderer/buffer/IndexBufferSystem";
import { initData as initDrawRenderCommandBufferData } from "../renderer/draw/DrawRenderCommandBufferSystem";
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
import { DrawRenderCommandBufferData } from "../renderer/draw/DrawRenderCommandBufferData";
import { IndexBufferData } from "../renderer/buffer/IndexBufferData";
import { ArrayBufferData } from "../renderer/buffer/ArrayBufferData";
import { GLSLSenderData } from "../renderer/shader/glslSender/GLSLSenderData";
import { LocationData } from "../renderer/shader/location/LocationData";
import { ProgramData } from "../renderer/shader/program/ProgramData";
import { BasicMaterialData } from "../component/material/BasicMaterialData";
import { LightMaterialData } from "../component/material/LightMaterialData";
import { initData as initLightData } from "../component/light/LightSystem";
import { AmbientLightData } from "../component/light/AmbientLightData";
import { DirectionLightData } from "../component/light/DirectionLightData";
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

export var setConfig = (closeContractTest: boolean, InitConfigData: any, WorkerDetectData: any, WorkerInstanceData: any, WebGLDetectData:any, {
    canvasID = "",
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
                canvasID: canvasID,
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

export var init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
    it("should set config before", () => {
        expect(configState.get("useDevicePixelRatio")).exist;
    })
}, (gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
    return compose(
        chain(initDevice(configState.get("contextConfig"), gameState, configState)),
        createCanvas(DomQuery)
    )(configState.get("canvasID"));
});

export var initData = null,
    passDataToRenderWorker = null;

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
    initData = () => {
        _initData();

        initProgramData(ProgramData);

        initLocationData(LocationData);

        initGLSLSenderData(GLSLSenderData);

        initArrayBufferData(ArrayBufferData);

        initIndexBufferData(IndexBufferData);

        initDrawRenderCommandBufferData(DrawRenderCommandBufferData);
    }

    passDataToRenderWorker = (WorkerInstanceData:any, WebGLDetectData:any) => {
        return IO.of(() => {
        });
    }
}

var _initData = null;


if(isWebgl1()){
    _initData = () => {
        initDirectorData(DirectorData);

        initShaderData(ShaderData);

        initGeometryData(DataBufferConfig, GeometryData);

        initMaterialData(TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData);

        initMeshRendererData(MeshRendererData);

        initTagData(TagData);

        initThreeDTransformData(GlobalTempData, ThreeDTransformData);

        initSceneData(SceneData);

        initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);

        initGameObjectData(GameObjectData);

        // initWorkerTimeData(WorkerTimeData);

        initRenderCommandBufferData(DataBufferConfig, RenderCommandBufferData);

        initLightData(AmbientLightData, DirectionLightData, WebGL1PointLightData);

        initSendDrawRenderCommandBufferData(SendDrawRenderCommandBufferData);
    }
}
else{
    _initData = () => {
        initDirectorData(DirectorData);

        initShaderData(ShaderData);

        initGeometryData(DataBufferConfig, GeometryData);

        initMaterialData(TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData);

        initMeshRendererData(MeshRendererData);

        initTagData(TagData);

        initThreeDTransformData(GlobalTempData, ThreeDTransformData);

        initSceneData(SceneData);

        initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);

        initGameObjectData(GameObjectData);

        // initWorkerTimeData(WorkerTimeData);

        initRenderCommandBufferData(DataBufferConfig, RenderCommandBufferData);

        initLightData(AmbientLightData, DirectionLightData, WebGL2PointLightData);

        initSendDrawRenderCommandBufferData(SendDrawRenderCommandBufferData);
    }
}
