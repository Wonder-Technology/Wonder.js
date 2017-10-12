import { Scene } from "./entityObject/scene/Scene";
import { Scheduler } from "./Scheduler";
export declare class Director {
    static getInstance(): any;
    private constructor();
    scene: Scene;
    scheduler: Scheduler;
    private _gameLoop;
    private _timeController;
    initWhenCreate(): void;
    start(): void;
    init(): void;
    loopBody(time: number): void;
    private _startLoop();
    private _buildInitStream();
    private _init(state);
    private _initSystem(state);
    private _initRenderer(state);
    private _buildLoopStream();
    private _loopBody(time, state);
}
export declare const isDirectorInit: () => boolean;
