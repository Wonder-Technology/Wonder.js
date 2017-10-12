import { Main } from "wonder-frp/dist/es2015/core/Main";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { getIsTest as getIsTestUtils, setIsTest as setIsTestUtils } from "../utils/config/initConfigUtils";
export var setLibIsTest = function (isTest) {
    return IO.of(function () {
        Main.isTest = isTest;
    });
};
export var getIsTest = getIsTestUtils;
export var setIsTest = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    setIsTest = function (isTest, InitConfigData, WorkerInstanceData) {
        return IO.of(function () {
            var renderWorker = getRenderWorker(WorkerInstanceData);
            renderWorker.postMessage({
                operateType: EWorkerOperateType.INIT_CONFIG,
                isTest: isTest
            });
            setIsTestUtils(isTest, InitConfigData).run();
        });
    };
}
else {
    setIsTest = function (isTest, InitConfigData, WorkerInstanceData) {
        return setIsTestUtils(isTest, InitConfigData);
    };
}
//# sourceMappingURL=InitConfigSystem.js.map