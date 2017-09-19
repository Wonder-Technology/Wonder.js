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
    init as initTransform, addAddComponentHandle as addThreeDTransformAddComponentHandle, addDisposeHandle as addThreeDTransformDisposeHandle
} from "../component/transform/ThreeDTransformSystem";
import { getState, isInit, markIsInit, run, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { Map } from "immutable";
import { GlobalTempData } from "../definition/GlobalTempData";
import { Scene } from "./entityObject/scene/Scene";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create } from "./entityObject/scene/SceneSystem";
import {
    addAddComponentHandle as addGeometryAddComponentHandle, addInitHandle as addGeometryInitHandle,
    init as initGeometry
} from "../component/geometry/GeometrySystem";
import { init as initRenderer } from "../renderer/core/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import {
    addInitHandle as addMaterialInitHandle,
    addAddComponentHandle as addMaterialAddComponentHandle,
    addDisposeHandle as addMaterialDisposeHandle
} from "../component/material/AllMaterialSystem";
import {
    addAddComponentHandle as addMeshRendererAddComponentHandle,
    addDisposeHandle as addMeshRendererDisposeHandle
} from "../component/renderer/MeshRendererSystem";
import { addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { MeshRenderer } from "../component/renderer/MeshRenderer";
import {
    addAddComponentHandle as addCameraControllerAddComponentHandle, addDisposeHandle as addCameraControllerDisposeHandle, init as initCameraController
} from "../component/camera/CameraControllerSystem";
import { PerspectiveCameraData } from "../component/camera/PerspectiveCameraData";
import { CameraData } from "../component/camera/CameraData";
import { CameraControllerData } from "../component/camera/CameraControllerData";
import { CameraController } from "../component/camera/CameraController";
import { Scheduler } from "./Scheduler";
import { AmbientLight } from "../component/light/AmbientLight";
import { DirectionLight } from "../component/light/DirectionLight";
import { BasicMaterial } from "../component/material/BasicMaterial";
import { LightMaterial } from "../component/material/LightMaterial";
import { BoxGeometry } from "../component/geometry/BoxGeometry";
import { CustomGeometry } from "../component/geometry/CustomGeometry";
import { PointLight } from "../component/light/PointLight";
import { isWebgl1 } from "../renderer/device/WebGLDetectSystem";
import { addAddComponentHandle as addWebGL1LightAddComponentHandle, addDisposeHandle as addWebGL1LightDisposeHandle } from "../component/webgl1/light/LightSystem";
import { addAddComponentHandle as addWebGL2LightAddComponentHandle, addDisposeHandle as addWebGL2LightDisposeHandle } from "../component/webgl2/light/LightSystem";
import { init as initPointLight } from "../component/light/PointLightSystem";
import { init as initDirectionLight } from "../component/light/DirectionLightSystem";
import { WebGL1PointLightData } from "../renderer/webgl1/light/PointLightData";
import { WebGL2PointLightData } from "../renderer/webgl2/light/PointLightData";
import { addDisposeHandle as addWebGL1GeometryDisposeHandle } from "../component/webgl1/geometry/GeometrySystem";
import { addDisposeHandle as addWebGL2GeometryDisposeHandle } from "../component/webgl2/geometry/GeometrySystem";
import { WebGL1DirectionLightData } from "../renderer/webgl1/light/DirectionLightData";
import { WebGL2DirectionLightData } from "../renderer/webgl2/light/DirectionLightData";
import { addAddComponentHandle, addDisposeHandle } from "../component/material/AllMaterialSystem";

@singleton(true)
@registerClass("Director")
export class Director {
    public static getInstance(): any { };

    private constructor() { }

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

    public init() {
        setState(this._init(getState(DirectorData)), DirectorData);
    }

    public loopBody(time: number) {
        setState(this._loopBody(time, getState(DirectorData)), DirectorData).run();
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
                self.loopBody(time);
                // }, (e) => {
                //     console.error(e);
                //     throw e;
                // });
            });
    }

    private _buildInitStream() {
        return callFunc(() => {
            this.init();
        }, this);
    }

    private _init(state: Map<any, any>) {
        var resultState = state;

        markIsInit(DirectorData);

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

        resultState = _initPointLight(state);
        resultState = _initDirectionLight(state);

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

export const isDirectorInit = () => {
    return isInit(DirectorData);
}


addMaterialAddComponentHandle(BasicMaterial, LightMaterial);
addMaterialDisposeHandle(BasicMaterial, LightMaterial);
addMaterialInitHandle(BasicMaterial, LightMaterial);

addMeshRendererAddComponentHandle(MeshRenderer);
addMeshRendererDisposeHandle(MeshRenderer);

addTagAddComponentHandle(Tag);
addTagDisposeHandle(Tag);

addThreeDTransformAddComponentHandle(ThreeDTransform);
addThreeDTransformDisposeHandle(ThreeDTransform);

addCameraControllerAddComponentHandle(CameraController);
addCameraControllerDisposeHandle(CameraController);

addGeometryAddComponentHandle(BoxGeometry, CustomGeometry);
addGeometryInitHandle(BoxGeometry, CustomGeometry);


var _initPointLight =null,
    _initDirectionLight = null;

if (isWebgl1()) {
    addWebGL1LightAddComponentHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL1LightDisposeHandle(AmbientLight, DirectionLight, PointLight);

    addWebGL1GeometryDisposeHandle(BoxGeometry, CustomGeometry);

    _initPointLight = (state: Map<any, any>) => {
        return initPointLight(WebGL1PointLightData, state);
    }

    _initDirectionLight = (state: Map<any, any>) => {
        return initDirectionLight(WebGL1DirectionLightData, state);
    }
}
else {
    addWebGL2LightAddComponentHandle(AmbientLight, DirectionLight, PointLight);
    addWebGL2LightDisposeHandle(AmbientLight, DirectionLight, PointLight);

    addWebGL2GeometryDisposeHandle(BoxGeometry, CustomGeometry);

    _initPointLight = (state: Map<any, any>) => {
        return initPointLight(WebGL2PointLightData, state);
    }

    _initDirectionLight = (state: Map<any, any>) => {
        return initDirectionLight(WebGL2DirectionLightData, state);
    }
}

