"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("wonder-frp/dist/commonjs/core/Main");
var WorkerDetectSystem_1 = require("../../device/WorkerDetectSystem");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var WorkerInstanceSystem_1 = require("../../worker/WorkerInstanceSystem");
var EWorkerOperateType_1 = require("../worker/both_file/EWorkerOperateType");
var initConfigUtils_1 = require("../utils/config/initConfigUtils");
exports.setLibIsTest = function (isTest) {
    return IO_1.IO.of(function () {
        Main_1.Main.isTest = isTest;
    });
};
exports.getIsTest = initConfigUtils_1.getIsTest;
exports.setIsTest = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    exports.setIsTest = function (isTest, InitConfigData, WorkerInstanceData) {
        return IO_1.IO.of(function () {
            var renderWorker = WorkerInstanceSystem_1.getRenderWorker(WorkerInstanceData);
            renderWorker.postMessage({
                operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_CONFIG,
                isTest: isTest
            });
        });
    };
}
else {
    exports.setIsTest = function (isTest, InitConfigData, WorkerInstanceData) {
        return initConfigUtils_1.setIsTest(isTest, InitConfigData);
    };
}
//# sourceMappingURL=InitConfigSystem.js.map