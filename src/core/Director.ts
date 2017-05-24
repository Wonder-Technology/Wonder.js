import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
// import { DeviceManager } from "../device/DeviceManager";
// import { SceneDispatcher } from "./entityObject/scene/SceneDispatcher";
// import { Renderer } from "../renderer/renderer/Renderer";
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
import { getState, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { Map } from "immutable";
import { GlobalTempData } from "../definition/GlobalTempData";
import { Scene } from "./entityObject/scene/Scene";
import { GameObjectData } from "./entityObject/gameObject/GameObjectData";
import { create } from "./entityObject/scene/SceneSystem";
import { addAddComponentHandle as addGeometryAddComponentHandle, addDisposeHandle as addGeometryDisposeHandle, init as initGeometry, initData as initGeometryData } from "../component/geometry/GeometrySystem";
import { clear, init as initRenderer, render } from "../renderer/render/WebGLRenderSystem";
import { GeometryData } from "../component/geometry/GeometryData";
import { initData as initShaderData } from "../renderer/shader/ShaderSystem";
import { ShaderData } from "../renderer/shader/ShaderData";
import { Geometry } from "../component/geometry/Geometry";
import { DataBufferConfig } from "../config/DataBufferConfig";
import {
    addAddComponentHandle as addMaterialAddComponentHandle, addDisposeHandle as addMaterialDisposeHandle,
    initData as initMaterialData
} from "../component/material/MaterialSystem";
import { MaterialData } from "../component/material/MaterialData";
import {
    addAddComponentHandle as addMeshRendererAddComponentHandle,
    addDisposeHandle as addMeshRendererDisposeHandle,
    initData as initMeshRendererData
} from "../component/renderer/MeshRendererSystem";
import { MeshRendererData } from "../component/renderer/MeshRendererData";
import { initData as initTagData, addAddComponentHandle as addTagAddComponentHandle, addDisposeHandle as addTagDisposeHandle } from "../component/tag/TagSystem";
import { TagData } from "../component/tag/TagData";
import { Tag } from "../component/tag/Tag";
import { ThreeDTransform } from "../component/transform/ThreeDTransform";
import { initData as initIndexBufferData } from "../renderer/buffer/IndexBufferSystem";
import { IndexBufferData } from "../renderer/buffer/IndexBufferData";
import { initData as initArrayBufferData } from "../renderer/buffer/ArrayBufferSystem";
import { ArrayBufferData } from "../renderer/buffer/ArrayBufferData";
import { Material } from "../component/material/Material";
import { MeshRenderer } from "../component/renderer/MeshRenderer";

@singleton(true)
@registerClass("Director")
export class Director {
    public static getInstance(): any { };

    private constructor() { }

    // public scene: SceneDispatcher = null;
    public scene: Scene = create(GameObjectData);
    // public renderer: Renderer = null;

    private _gameLoop: IDisposable = null;
    // private _gameState: EGameState = EGameState.NORMAL;
    private _timeController: DirectorTimeController = DirectorTimeController.create();
    // private _transformSystem: ThreeDTransformSystem = ThreeDTransformSystem.create();

    public initWhenCreate() {
        // this.scene = SceneDispatcher.create();
        // this.renderer = WebGLRenderer.create();
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

        // this._timeController.start();

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

    private _initSystem(state: Map<any, any>){
        var resultState = initTransform(GlobalTempData, ThreeDTransformData, state);

        resultState = initGeometry(GeometryData, state);

        return resultState;
    }

    private _initRenderer(state: Map<any, any>){
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

        // elapsed = this._timeController.computeElapseTime(time);

        return this._run(elapsed, state);
    }

    private _run(elapsed: number, state: Map<any, any>) {
        // this._timeController.tick(elapsed);

        // EventManager.trigger(CustomEvent.create(<any>EEngineEvent.STARTLOOP));

        var resultState = this._update(elapsed, state);

        resultState = this._render(state);

        // EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));

        return resultState;
    }

    private _update(elapsed: number, state: Map<any, any>) {
        // this.scene.gameObjectScene.update(elapsed);

        var resultState = this._updateSystem(elapsed, state);

        return resultState;
    }

    private _render(state: Map<any, any>) {
        var resultState = state;

        // this.scene.gameObjectScene.render(this.renderer);
        //
        // this.renderer.clear();
        //
        // if (this.renderer.hasCommand()) {
        //     this.renderer.webglState = BasicState.create();
        //     this.renderer.render();
        // }

        resultState = clear(state);

        resultState = render(state);

        return resultState
    }

    private _updateSystem(elapsed: number, state: Map<any, any>) {
        var resultState = updateTransform(elapsed, GlobalTempData, ThreeDTransformData, state);

        return resultState;
    }
}

initShaderData(ShaderData);

initGeometryData(DataBufferConfig, GeometryData);
addGeometryAddComponentHandle(Geometry, GeometryData);
addGeometryDisposeHandle(Geometry, GeometryData);

initMaterialData(MaterialData);
addMaterialAddComponentHandle(Material, MaterialData);
addMaterialDisposeHandle(Material, MaterialData);

initMeshRendererData(MeshRendererData);
addMeshRendererAddComponentHandle(MeshRenderer, MeshRendererData);
addMeshRendererDisposeHandle(MeshRenderer, MeshRendererData);

initTagData(TagData);
addTagAddComponentHandle(Tag, TagData);
addTagDisposeHandle(Tag, TagData);

initThreeDTransformData(GlobalTempData, ThreeDTransformData);
addThreeDTransformAddComponentHandle(ThreeDTransform, ThreeDTransformData);
addThreeDTransformDisposeHandle(ThreeDTransform, GlobalTempData, ThreeDTransformData);

initArrayBufferData(ArrayBufferData);

initIndexBufferData(IndexBufferData);
