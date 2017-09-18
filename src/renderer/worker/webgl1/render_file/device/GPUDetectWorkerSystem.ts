import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { detect as detectUtils, initData as initDataUtils } from "../../../../webgl1/utils/worker/render_file/device/gpuDetectUtils";

export const detect = curry((getGL: Function, DeviceManagerWorkerData: any, GPUDetectWorkerData: any, state: Map<any, any>, ) => {
    return detectUtils(getGL, DeviceManagerWorkerData, GPUDetectWorkerData, state);
})

export const initData = initDataUtils;
