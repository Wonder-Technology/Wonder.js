import { TimeController } from "./TimeController";
export declare class DirectorTimeController extends TimeController {
    static create(): DirectorTimeController;
    gameTime: number;
    fps: number;
    isTimeChange: boolean;
    deltaTime: number;
    private _lastTime;
    tick(time: number): void;
    start(): void;
    resume(): void;
    protected getNow(): any;
    private _updateFps(deltaTime);
}
