export var render = (dt: number, renderFunc: (dt: number) => void, WorkerConfig: any, WorkerTimeData: any) => {
    var accumulator = WorkerTimeData.accumulator,
        steps: number = null,
        renderWorkerDT = WorkerConfig.renderWorkerDT;

    accumulator += dt;

    // take the current delta, plus what remains from last time,
    // and determine how many logical steps fit.
    steps = Math.floor(accumulator / renderWorkerDT);

    // Remove what will be consumed this tick.
    if (steps > 0) {
        accumulator -= steps * renderWorkerDT;
    }

    while (steps > 0) {
        renderFunc(renderWorkerDT);
        steps--;
    }

    WorkerTimeData.accumulator = accumulator;
}

export var initData = (WorkerTimeData: any) => {
    WorkerTimeData.accumulator = 0;
}
