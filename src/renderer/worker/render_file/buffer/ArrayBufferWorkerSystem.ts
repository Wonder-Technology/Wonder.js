import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../../../utils/buffer/arrayBufferUtils";
import { disposeBuffer as disposeBufferUtils } from "../../../utils/buffer/bufferUtils";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";

export var getOrCreateBuffer = getOrCreateBufferUtils;

export var disposeBuffer = (geometryIndex: number, ArrayBufferWorkerData: any) => {
    disposeBufferUtils(geometryIndex, ArrayBufferWorkerData.buffers, getGL, DeviceManagerWorkerData);
}

export var initData = initDataUtils;
