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
// import {ThreeDTransformSystem} from "../component/transform/ThreeDTransformSystem";

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
                self._loopBody(time);
                // }, (e) => {
                //     console.error(e);
                //     throw e;
                // });
            });
    }

    private _buildInitStream() {
        return callFunc(() => {
            this._init();
        }, this);
    }

    private _init() {
        this._initGameObjectScene();
    }

    private _initGameObjectScene() {
        var gameObjectScene: GameObjectScene = this.scene.gameObjectScene;

        gameObjectScene.init();

        //todo not put here?
        // this.renderer.init();

        this._timeController.start();
    }

    private _buildLoopStream() {
        return intervalRequest();
    }

    private _loopBody(time) {
        var elapsed: number = null;

        if (this._gameState === EGameState.PAUSE || this._gameState === EGameState.STOP) {
            return false;
        }

        elapsed = this._timeController.computeElapseTime(time);

        this._run(elapsed);

        return true;
    }

    private _run(elapsed: number) {
        this._timeController.tick(elapsed);

        // EventManager.trigger(CustomEvent.create(<any>EEngineEvent.STARTLOOP));

        this._update(elapsed);

        // this._render();

        // EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));
    }

    private _update(elapsed: number) {
        this.scene.gameObjectScene.update(elapsed);

        // ThreeDTransformSystem.getInstance().update(elapsed);
    }
}

