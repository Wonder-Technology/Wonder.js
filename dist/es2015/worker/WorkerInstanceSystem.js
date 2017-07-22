import { getRenderWorkerFilePath, isSupportRenderWorkerAndSharedArrayBuffer } from "../device/WorkerDetectSystem";
export var getRenderWorker = function (WorkerInstanceData) {
    return WorkerInstanceData.renderWorker;
};
export var setRenderWorker = function (worker, WorkerInstanceData) {
    WorkerInstanceData.renderWorker = worker;
};
export var createWorker = function (workerFilePath) {
    return new Worker(workerFilePath);
};
export var initWorkInstances = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    initWorkInstances = function (WorkerInstanceData) {
        setRenderWorker(createWorker(getRenderWorkerFilePath()), WorkerInstanceData);
    };
}
else {
    initWorkInstances = function (WorkerInstanceData) {
    };
}
//# sourceMappingURL=WorkerInstanceSystem.js.map