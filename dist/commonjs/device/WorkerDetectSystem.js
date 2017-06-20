"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var DomQuery_1 = require("wonder-commonlib/dist/commonjs/utils/DomQuery");
var WorkerDetectData_1 = require("./WorkerDetectData");
var Variable_1 = require("../definition/Variable");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var RenderWorkerConfig_1 = require("../config/RenderWorkerConfig");
exports.detect = curry_1.default(function (WorkerDetectData) {
    if (typeof Variable_1.root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof Variable_1.root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
        WorkerDetectData.isSupportSharedArrayBuffer = Variable_1.root.isSupportSharedArrayBuffer_wonder;
        WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = Variable_1.root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;
        return;
    }
    var canvas = DomQuery_1.DomQuery.create("<canvas></canvas>").get(0);
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
exports.isSupportSharedArrayBuffer = function () {
    return WorkerDetectData_1.WorkerDetectData.isSupportSharedArrayBuffer;
};
exports.isSupportRenderWorkerAndSharedArrayBuffer = function () {
    return RenderWorkerConfig_1.RenderWorkerConfig.useRenderWorker && WorkerDetectData_1.WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
};
exports.setWorkerConfig = function (config, WorkerDetectData) {
    return IO_1.IO.of(function () {
        WorkerDetectData.renderWorkerFileDir = config.renderWorkerFileDir;
    });
};
exports.getRenderWorkerFilePath = function () {
    return _getValidFileDir(WorkerDetectData_1.WorkerDetectData.renderWorkerFileDir) + "wd.renderWorker.js";
};
var _getValidFileDir = function (dir) {
    if (dir.slice(-1) !== '/') {
        return dir + "/";
    }
    return dir;
};
exports.detect(WorkerDetectData_1.WorkerDetectData);
//# sourceMappingURL=WorkerDetectSystem.js.map