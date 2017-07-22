"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerDetectSystem_1 = require("../device/WorkerDetectSystem");
exports.getRenderWorker = function (WorkerInstanceData) {
    return WorkerInstanceData.renderWorker;
};
exports.setRenderWorker = function (worker, WorkerInstanceData) {
    WorkerInstanceData.renderWorker = worker;
};
exports.createWorker = function (workerFilePath) {
    return new Worker(workerFilePath);
};
exports.initWorkInstances = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.initWorkInstances = function (WorkerInstanceData) {
        exports.setRenderWorker(exports.createWorker(WorkerDetectSystem_1.getRenderWorkerFilePath()), WorkerInstanceData);
    };
}
else {
    exports.initWorkInstances = function (WorkerInstanceData) {
    };
}
//# sourceMappingURL=WorkerInstanceSystem.js.map