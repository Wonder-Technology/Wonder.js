import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { detect as detectUtils, initData as initDataUtils, hasExtensionColorBufferFloat as hasExtensionColorBufferFloatUtils } from "../../../../webgl2/utils/worker/render_file/device/gpuDetectUtils";

export var detect = curry((getGL: Function, DeviceManagerWorkerData: any, GPUDetectWorkerData: any, state: Map<any, any>, ) => {
    return detectUtils(getGL, DeviceManagerWorkerData, GPUDetectWorkerData, state);
})

export var hasExtensionColorBufferFloat = hasExtensionColorBufferFloatUtils;

export var initData = initDataUtils;
