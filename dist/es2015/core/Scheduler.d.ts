export declare class Scheduler {
    static create(): Scheduler;
    private _scheduleCount;
    private _schedules;
    update(elapsed: number): void;
    scheduleLoop(task: Function, args?: Array<any>): string;
    scheduleFrame(task: any, frame?: number, args?: any): string;
    scheduleInterval(task: any, time?: number, args?: any): string;
    scheduleTime(task: any, time?: number, args?: any): string;
    pause(scheduleId?: string): void;
    resume(scheduleId?: string): void;
    start(scheduleId?: string): void;
    stop(scheduleId?: string): void;
    has(scheduleId: string): boolean;
    remove(scheduleId: string): void;
    removeAll(): void;
    private _schedule(_class, args);
    private _buildId();
}
