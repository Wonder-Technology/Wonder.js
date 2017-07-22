import { Main } from "wonder-frp/dist/commonjs/core/Main";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { IO } from "wonder-fantasy-land/dist/commonjs/types/IO";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { getIsTest as getIsTestUtils, setIsTest as setIsTestUtils } from "../utils/config/initConfigUtils";

export var setLibIsTest = (isTest: boolean) => {
    return IO.of(() => {
        Main.isTest = isTest;
    });
}

export var getIsTest = getIsTestUtils;

export var setIsTest = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    setIsTest = (isTest: boolean, InitConfigData: any, WorkerInstanceData: any) => {
        return IO.of(() => {
            var renderWorker = getRenderWorker(WorkerInstanceData);

            renderWorker.postMessage({
                operateType: EWorkerOperateType.INIT_CONFIG,
                isTest: isTest
            });
        })
    }
}
else {
    setIsTest = (isTest: boolean, InitConfigData: any, WorkerInstanceData: any) => {
        return setIsTestUtils(isTest, InitConfigData);
    }
}

