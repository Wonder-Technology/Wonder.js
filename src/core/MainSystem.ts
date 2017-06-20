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
import { render_config } from "../renderer/data/render_config";
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
import { Main } from "wonder-frp/dist/es2015/core/Main";
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

export var getIsTest = (MainData: any) => {
    return MainData.isTest;
}

export var setIsTest = (isTest: boolean, MainData: any) => {
    return IO.of(() => {
        MainData.isTest = isTest;
    });
}

export var setLibIsTest = (isTest: boolean) => {
    return IO.of(() => {
        Main.isTest = isTest;
    });
}

export var setConfig = (closeContractTest: boolean, MainData: any, WorkerDetectData: any, {
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

        setIsTest(_isTest, MainData).run();

        setWorkerConfig(workerConfig, WorkerDetectData).run();

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

export var init = requireCheckFunc((gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
    it("should set config before", () => {
        expect(configState.get("useDevicePixelRatio")).exist;
    })
}, (gameState: Map<string, any>, configState: Map<any, any>, DomQuery: any) => {
    return compose(
        chain(initDevice(configState.get("contextConfig"), gameState, configState)),
        createCanvas(DomQuery)
    )(configState.get("canvasId"));
});

export var initData = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initData = () => {
        _initData();
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
}

var _initData = () => {
    initShaderData(ShaderData);

    initGeometryData(DataBufferConfig, GeometryData);

    initMaterialData(MaterialData);

    initMeshRendererData(MeshRendererData);

    initTagData(TagData);

    initThreeDTransformData(GlobalTempData, ThreeDTransformData);

    initSceneData(SceneData);

    initCameraControllerData(CameraControllerData, PerspectiveCameraData, CameraData);

    initGameObjectData(GameObjectData);

    // initWorkerTimeData(WorkerTimeData);

    initRenderCommandBufferData(DataBufferConfig, RenderCommandBufferData);
}


