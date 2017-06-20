import "wonder-frp/dist/es2015/stream/ConcatStream";
import "wonder-frp/dist/es2015/stream/IgnoreElementsStream";
import "wonder-frp/dist/es2015/extend/root";
import { Scene } from "./entityObject/scene/Scene";
import { Scheduler } from "./Scheduler";
export declare class Director {
    static getInstance(): any;
    private constructor();
    readonly view: any;
    scene: Scene;
    scheduler: Scheduler;
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
}
