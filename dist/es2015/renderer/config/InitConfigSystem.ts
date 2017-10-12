import { Main } from "wonder-frp/dist/es2015/core/Main";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../device/WorkerDetectSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { getRenderWorker } from "../../worker/WorkerInstanceSystem";
import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { getIsTest as getIsTestUtils, setIsTest as setIsTestUtils } from "../utils/config/initConfigUtils";

export const setLibIsTest = (isTest: boolean) => {
    return IO.of(() => {
        Main.isTest = isTest;
    });
}

export const getIsTest = getIsTestUtils;

export var setIsTest = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    setIsTest = (isTest: boolean, InitConfigData: any, WorkerInstanceData: any) => {
        return IO.of(() => {
            var renderWorker = getRenderWorker(WorkerInstanceData);

            renderWorker.postMessage({
                operateType: EWorkerOperateType.INIT_CONFIG,
                isTest: isTest
            });

            setIsTestUtils(isTest, InitConfigData).run();
        })
    }
}
else {
    setIsTest = (isTest: boolean, InitConfigData: any, WorkerInstanceData: any) => {
        return setIsTestUtils(isTest, InitConfigData);
    }
}

