import { initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/worker/render_file/buffer/bufferUtils";
export var initData = initDataUtils;
export var disposeBuffer = function (geometryIndex, IndexBufferData) {
    disposeBufferUtils(geometryIndex, IndexBufferData.buffers, getGL, DeviceManagerData);
};
//# sourceMappingURL=IndexBufferSystem.js.map