export declare abstract class TimeController {
    elapsed: number;
    pauseElapsed: number;
    pauseTime: number;
    startTime: number;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
    computeElapseTime(time: number): number;
    protected abstract getNow(): any;
}
