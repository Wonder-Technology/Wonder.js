export var getRenderWorker = (WorkerInstanceData: any) => {
    return WorkerInstanceData.renderWorker;
}

export var setRenderWorker = (worker: Worker, WorkerInstanceData: any) => {
    WorkerInstanceData.renderWorker = worker;
}