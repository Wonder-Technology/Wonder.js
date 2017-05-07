import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
// import { DeviceManager } from "../device/DeviceManager";
import { SceneDispatcher } from "./entityObject/scene/SceneDispatcher";
// import { Renderer } from "../renderer/renderer/Renderer";
import { IDisposable } from "wonder-frp/dist/es2015/Disposable/IDisposable";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
// import { WebGLRenderer } from "../renderer/renderer/WebGLRenderer";
import { callFunc, intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import { GameObjectScene } from "./entityObject/scene/gameObjectScene/GameObjectScene";
// import { BasicState } from "../renderer/state/BasicState";
// import { EventManager } from "../event/EventManager";
// import { CustomEvent } from "../event/object/CustomEvent";
// import { EEngineEvent } from "../event/EEngineEvent";
import { init as initTransform, update as updateTransform } from "../component/transform/ThreeDTransformSystem";
import { getState, setState } from "./DirectorSystem";
import { DirectorData } from "./DirectorData";
import { ThreeDTransformData } from "../component/transform/ThreeDTransformData";
import { Map } from "immutable";
import { compose } from "../utils/functionalUtils";
import { GlobalTempData } from "../definition/GlobalTempData";

@singleton(true)
@registerClass("Director")
export class Director {
    public static getInstance(): any { };

    private constructor() { }

    public scene: SceneDispatcher = null;
    // public renderer: Renderer = null;

    private _gameLoop: IDisposable = null;
    // private _gameState: EGameState = EGameState.NORMAL;
    private _timeController: DirectorTimeController = DirectorTimeController.create();
    // private _transformSystem: ThreeDTransformSystem = ThreeDTransformSystem.create();

    public initWhenCreate() {
        this.scene = SceneDispatcher.create();
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

        resultState = this._initGameObjectScene(resultState);
        // resultState = this._initSystem(resultState);

        return resultState;
    }

    private _initGameObjectScene(state: Map<any, any>) {
        var resultState = state,
            gameObjectScene: GameObjectScene = this.scene.gameObjectScene;

        gameObjectScene.init(resultState);

        //todo not put here?
        // this.renderer.init();

        // this._timeController.start();

        return resultState;
    }

    // private _initSystem(state: Map<any, any>){
    //     return initTransform(GlobalTempData, ThreeDTransformData, state).run();
    // }

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

        // this._render();

        // EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));

        return resultState;
    }

    private _update(elapsed: number, state: Map<any, any>) {
        // this.scene.gameObjectScene.update(elapsed);

        var resultState = this._updateSystem(elapsed, state);

        return resultState;
    }

    // private _render() {
    //     this.scene.gameObjectScene.render(this.renderer);
    //
    //     this.renderer.clear();
    //
    //     if (this.renderer.hasCommand()) {
    //         this.renderer.webglState = BasicState.create();
    //         this.renderer.render();
    //     }
    // }

    private _updateSystem(elapsed: number, state: Map<any, any>) {
        var resultState = updateTransform(elapsed, GlobalTempData, ThreeDTransformData, state);

        return resultState;
    }
}
