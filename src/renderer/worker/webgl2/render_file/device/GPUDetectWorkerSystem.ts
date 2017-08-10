import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { detect as detectUtils, hasExtensionColorBufferFloat as hasExtensionColorBufferFloatUtils } from "../../../../webgl2/utils/device/gpuDetectUtils";

export var detect = curry((getGL: Function, DeviceManagerWorkerData: any, GPUDetectWorkerData:any, state: Map<any, any>,) => {
    return detectUtils(getGL, DeviceManagerWorkerData, GPUDetectWorkerData, state);
})

export var hasExtensionColorBufferFloat = hasExtensionColorBufferFloatUtils;

