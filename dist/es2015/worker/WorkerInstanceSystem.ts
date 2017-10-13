import { getRenderWorkerFilePath, isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";

export const getRenderWorker = (WorkerInstanceData: any) => {
    return WorkerInstanceData.renderWorker;
}

export const setRenderWorker = (worker: Worker, WorkerInstanceData: any) => {
    WorkerInstanceData.renderWorker = worker;
}

export const createWorker = (workerFilePath: string) => {
    return new Worker(workerFilePath);
}

export var initWorkInstances = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initWorkInstances = (WorkerInstanceData) => {
        setRenderWorker(createWorker(getRenderWorkerFilePath()), WorkerInstanceData);
    }
}
else {
    initWorkInstances = (WorkerInstanceData) => {
    }
}
