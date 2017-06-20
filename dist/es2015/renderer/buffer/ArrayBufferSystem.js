import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/arrayBufferUtils";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/buffer/bufferUtils";
export var getOrCreateBuffer = getOrCreateBufferUtils;
export var initData = initDataUtils;
export var disposeBuffer = function (geometryIndex, ArrayBufferData) {
    disposeBufferUtils(geometryIndex, ArrayBufferData.buffers, getGL, DeviceManagerData);
};
//# sourceMappingURL=ArrayBufferSystem.js.map