import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { detect as detectUtils } from "../../../../webgl1/utils/worker/render_file/device/gpuDetectUtils";

export var detect = curry((getGL: Function, DeviceManagerWorkerData: any, GPUDetectWorkerData:any, state: Map<any, any>,) => {
    return detectUtils(getGL, DeviceManagerWorkerData, GPUDetectWorkerData, state);
})

