import "wonder-frp/dist/commonjs/stream/ConcatStream";
import "wonder-frp/dist/commonjs/stream/IgnoreElementsStream";
import "wonder-frp/dist/commonjs/extend/root";
import { Scene } from "./entityObject/scene/Scene";
export declare class Director {
    static getInstance(): any;
    private constructor();
    readonly view: any;
    scene: Scene;
    private _gameLoop;
    private _timeController;
    initWhenCreate(): void;
    start(): void;
    private _startLoop();
    private _buildInitStream();
    private _init(state);
    private _initSystem(state);
    private _initRenderer(state);
    private _buildLoopStream();
    private _loopBody(time, state);
    private _run(elapsed, state);
    private _update(elapsed, state);
    private _render(state);
    private _updateSystem(elapsed, state);
}
