import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/arrayBufferUtils";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/buffer/bufferUtils";

// export var getOrCreateBuffer = getOrCreateBufferUtils;

export var initData = initDataUtils;

export var disposeBuffer = (geometryIndex: number, ArrayBufferData: any) => {
    disposeBufferUtils(geometryIndex, ArrayBufferData.verticeBuffers, getGL, DeviceManagerData);
    disposeBufferUtils(geometryIndex, ArrayBufferData.normalBuffers, getGL, DeviceManagerData);
}
