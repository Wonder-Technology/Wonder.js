import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { IDisposable } from "wonder-frp/dist/es2015/Disposable/IDisposable";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
// import { WebGLRenderer } from "../renderer/renderer/WebGLRenderer";
import { callFunc, intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
// import { GameObjectScene } from "./entityObject/scene/gameObjectScene/GameObjectScene";
// import { BasicState } from "../renderer/state/BasicState";
// import { EventManager } from "../event/EventManager";
// import { CustomEvent } from "../event/object/CustomEvent";
// import { EEngineEvent } from "../event/EEngineEvent";
import {
    init as initTransform, initData as initThreeDTransformData, addAddComponentHandle as addThreeDTransformAddComponentHandle, addDisposeHandle as addThreeDTransformDisposeHandle, update as updateTransform
} from "../component/transform/ThreeDTransformSystem";
import { getState, render, run, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { Map } from "immutable";
import { GlobalTempData } from "../definition/GlobalTempData";
import { Scene } from "./entityObject/scene/Scene";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create, initData as initSceneData } from "./entityObject/scene/SceneSystem";
import {
    addAddComponentHandle as addGeometryAddComponentHandle, addDisposeHandle as addGeometryDisposeHandle, addInitHandle as addGeometryInitHandle,
    init as initGeometry, initData as initGeometryData
} from "../component/geometry/GeometrySystem";
import { init as initRenderer } from "../renderer/render/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import { Geometry } from "../component/geometry/Geometry";
import {
    addAddComponentHandle as addMaterialAddComponentHandle, addDisposeHandle as addMaterialDisposeHandle,
    addInitHandle as addMaterialInitHandle
} from "../component/material/MaterialSystem";
import {
    addAddComponentHandle as addMeshRendererAddComponentHandle,
    addDisposeHandle as addMeshRendererDisposeHandle
} from "../component/renderer/MeshRendererSystem";
import { addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { Material } from "../component/material/Material";
import { MeshRenderer } from "../component/renderer/MeshRenderer";
import {
    addAddComponentHandle as addCameraControllerAddComponentHandle, addDisposeHandle as addCameraControllerDisposeHandle, init as initCameraController,
    update as updateCameraController
} from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { CameraController } from "../component/camera/CameraController";
import { DeviceManager } from "../renderer/device/DeviceManager";
import { Scheduler } from "./Scheduler";
// import { SendDrawRenderCommandBufferData } from "../renderer/worker/logic_file/draw/SendDrawRenderCommandBufferData";
// import { ERenderWorkerState } from "../renderer/worker/both_file/ERenderWorkerState";
import { addAddComponentHandle as addLightAddComponentHandle, addDisposeHandle as addLightDisposeHandle } from "../component/light/LightSystem";
import { AmbientLight } from "../component/light/AmbientLight";
import { DirectionLight } from "../component/light/DirectionLight";

@singleton(true)
@registerClass("Director")
export class Director {
    public static getInstance(): any { };

    private constructor() { }

    get view() {
        return DeviceManager.getInstance().view;
    }

    // public scene: SceneDispatcher = null;
    public scene: Scene = create(GameObjectData);
    // public renderer: Renderer = null;
    public scheduler: Scheduler = null;

    private _gameLoop: IDisposable = null;
    // private _gameState: EGameState = EGameState.NORMAL;
    private _timeController: DirectorTimeController = DirectorTimeController.create();
    // private _transformSystem: ThreeDTransformSystem = ThreeDTransformSystem.create();

    public initWhenCreate() {
        // this.scene = SceneDispatcher.create();
        // this.renderer = WebGLRenderer.create();
        this.scheduler = Scheduler.create();
    }

    public start() {
        // this._gameState = EGameState.NORMAL;

        this._startLoop();
    }

    private _startLoop() {
        var self = this;

        // console.log(IgnoreElementsStream, ConcatStream);

        this._gameLoop = this._buildInitStream()
            .ignoreElements()
            .concat(this._buildLoopStream())
            .subscribe((time) => {
                //todo need polyfill
                /*!
                 I assume that the time is DOMHighResTimeStamp, but it may be DOMTimeStamp in some browser!
                 so it need polyfill
                 */
                setState(self._loopBody(time, getState(DirectorData)), DirectorData).run();
                // }, (e) => {
                //     console.error(e);
                //     throw e;
                // });
            });
    }

    private _buildInitStream() {
        return callFunc(() => {
            setState(this._init(getState(DirectorData)), DirectorData);
        }, this);
    }

    private _init(state: Map<any, any>) {
        var resultState = state;

        // resultState = this._initGameObjectScene(resultState);
        resultState = this._initSystem(resultState);

        resultState = this._initRenderer(resultState);

        // this.renderer.init();

        this._timeController.start();
        this.scheduler.start();

        return resultState;
    }

    // private _initGameObjectScene(state: Map<any, any>) {
    //     var resultState = state,
    //         gameObjectScene: GameObjectScene = this.scene.gameObjectScene;
    //
    //     gameObjectScene.init(resultState);
    //
    //     return resultState;
    // }

    private _initSystem(state: Map<any, any>) {
        var resultState = initTransform(GlobalTempData, ThreeDTransformData, state);

        resultState = initGeometry(GeometryData, state);

        resultState = initCameraController(PerspectiveCameraData, CameraData, CameraControllerData, state);

        return resultState;
    }

    private _initRenderer(state: Map<any, any>) {
        var resultState = initRenderer(state);

        return resultState;
    }

    private _buildLoopStream() {
        return intervalRequest();
    }

    private _loopBody(time: number, state: Map<any, any>) {
        var elapsed: number = null;

        // if (this._gameState === EGameState.PAUSE || this._gameState === EGameState.STOP) {
        //     return false;
        // }

        elapsed = this._timeController.computeElapseTime(time);

        return run(elapsed, state, this._timeController, this.scheduler);
    }
}

addGeometryAddComponentHandle(Geometry);
addGeometryDisposeHandle(Geometry);
addGeometryInitHandle(Geometry);

addMaterialAddComponentHandle(Material);
addMaterialDisposeHandle(Material);
addMaterialInitHandle(Material);

addMeshRendererAddComponentHandle(MeshRenderer);
addMeshRendererDisposeHandle(MeshRenderer);

addTagAddComponentHandle(Tag);
addTagDisposeHandle(Tag);

addThreeDTransformAddComponentHandle(ThreeDTransform);
addThreeDTransformDisposeHandle(ThreeDTransform);

addCameraControllerAddComponentHandle(CameraController);
addCameraControllerDisposeHandle(CameraController);

addLightAddComponentHandle(AmbientLight, DirectionLight);
addLightDisposeHandle(AmbientLight, DirectionLight);
