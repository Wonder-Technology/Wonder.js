import curry from "wonder-lodash/curry";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { WorkerDetectData } from "./WorkerDetectData";
import { root } from "../definition/Variable";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { RenderWorkerConfig } from "../config/RenderWorkerConfig";
export var detect = curry(function (WorkerDetectData) {
    if (typeof root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
        WorkerDetectData.isSupportSharedArrayBuffer = root.isSupportSharedArrayBuffer_wonder;
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;
        return;
    }
    var canvas = DomQuery.create("<canvas></canvas>").get(0);
    if (typeof SharedArrayBuffer !== "undefined") {
        WorkerDetectData.isSupportSharedArrayBuffer = true;
    }
    else {
        WorkerDetectData.isSupportSharedArrayBuffer = false;
    }
    if (("transferControlToOffscreen" in canvas) && WorkerDetectData.isSupportSharedArrayBuffer) {
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = true;
    }
    else {
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = false;
    }
});
export var isSupportSharedArrayBuffer = function () {
    return WorkerDetectData.isSupportSharedArrayBuffer;
};
export var isSupportRenderWorkerAndSharedArrayBuffer = function () {
    return RenderWorkerConfig.useRenderWorker && WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
};
export var setWorkerConfig = function (config, WorkerDetectData) {
    return IO.of(function () {
        WorkerDetectData.renderWorkerFileDir = config.renderWorkerFileDir;
    });
};
export var getRenderWorkerFilePath = function () {
    return _getValidFileDir(WorkerDetectData.renderWorkerFileDir) + "wd.renderWorker.js";
};
var _getValidFileDir = function (dir) {
    if (dir.slice(-1) !== '/') {
        return dir + "/";
    }
    return dir;
};
detect(WorkerDetectData);
//# sourceMappingURL=WorkerDetectSystem.js.map