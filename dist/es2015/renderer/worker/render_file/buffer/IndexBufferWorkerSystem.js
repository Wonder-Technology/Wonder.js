import { initData as initDataUtils } from "../../../utils/buffer/indexBufferUtils";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { disposeBuffer as disposeBufferUtils } from "../../../utils/worker/render_file/buffer/bufferUtils";
export var disposeBuffer = function (geometryIndex, IndexBufferWorkerData) {
    disposeBufferUtils(geometryIndex, IndexBufferWorkerData.buffers, getGL, DeviceManagerWorkerData);
};
export var initData = initDataUtils;
//# sourceMappingURL=IndexBufferWorkerSystem.js.map