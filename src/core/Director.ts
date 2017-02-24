import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { singleton } from "../definition/typescript/decorator/singleton";
import { DeviceManager } from "../device/DeviceManager";
import { SceneDispatcher } from "./entityObject/scene/SceneDispatcher";
import { Renderer } from "../renderer/renderer/Renderer";
import { IDisposable } from "wonder-frp/dist/es2015/Disposable/IDisposable";
import { DirectorTimeController } from "../utils/time/DirectorTimeController";
import { WebGLRenderer } from "../renderer/renderer/WebGLRenderer";
import { callFunc, intervalRequest } from "wonder-frp/dist/es2015/global/Operator";
import { GameObjectScene } from "./entityObject/scene/gameObjectScene/GameObjectScene";
import { BasicState } from "../renderer/state/BasicState";
import {EventManager} from "../event/EventManager";
import {CustomEvent} from "../event/object/CustomEvent";
import {EEngineEvent} from "../event/EEngineEvent";

enum EGameState {
    NORMAL,
    STOP,
    PAUSE
}

//todo invoke scene.onExit

@singleton(true)
@registerClass("Director")
export class Director {
    public static getInstance(): any { };

    private constructor() { }

    get gameTime() {
        return this._timeController.gameTime;
    }

    get fps() {
        return this._timeController.fps;
    }

    get isNormal() {
        return this._gameState === EGameState.NORMAL;
    }

    get isStop() {
        return this._gameState === EGameState.STOP;
    }

    get isPause() {
        return this._gameState === EGameState.PAUSE;
    }

    get isTimeChange() {
        return this._timeController.isTimeChange;
    }

    get elapsed() {
        return this._timeController.elapsed;
    }

    get view() {
        return DeviceManager.getInstance().view;
    }

    public scene: SceneDispatcher = null;
    public renderer: Renderer = null;

    private _gameLoop: IDisposable = null;
    private _gameState: EGameState = EGameState.NORMAL;
    private _timeController: DirectorTimeController = DirectorTimeController.create();


    public initWhenCreate() {
        this.scene = SceneDispatcher.create();
        this.renderer = WebGLRenderer.create();
    }

    public start() {
        this._gameState = EGameState.NORMAL;

        this._startLoop();
    }

    public stop() {
        this._gameLoop && this._gameLoop.dispose();
        this._gameState = EGameState.STOP;
        this._timeController.stop();
    }

    public pause() {
        if (this._gameState === EGameState.PAUSE) {
            return;
        }

        this._gameState = EGameState.PAUSE;
        this._timeController.pause();
    }

    public resume() {
        this._gameState = EGameState.NORMAL;
        this._timeController.resume();
    }

    //todo add dispose

    public getDeltaTime() {
        return this._timeController.deltaTime;
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
        this.renderer.init();

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

        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.STARTLOOP));

        this._update(elapsed);

        this._render();

        EventManager.trigger(CustomEvent.create(<any>EEngineEvent.ENDLOOP));
    }

    private _update(elapsed: number) {
        this.scene.gameObjectScene.update(elapsed);
    }

    private _render() {
        this.scene.gameObjectScene.render(this.renderer);

        this.renderer.clear();

        if (this.renderer.hasCommand()) {
            this.renderer.webglState = BasicState.create();
            this.renderer.render();
        }
    }
}