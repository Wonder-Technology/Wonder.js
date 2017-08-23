import { initData as initDataUtils } from "../../../utils/buffer/arrayBufferUtils";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
import { disposeBuffer as disposeBufferUtils } from "../../../utils/worker/render_file/buffer/bufferUtils";
export var disposeBuffer = function (geometryIndex, ArrayBufferWorkerData) {
    disposeBufferUtils(geometryIndex, ArrayBufferWorkerData.vertexBuffers, getGL, DeviceManagerWorkerData);
    disposeBufferUtils(geometryIndex, ArrayBufferWorkerData.normalBuffers, getGL, DeviceManagerWorkerData);
    disposeBufferUtils(geometryIndex, ArrayBufferWorkerData.texCoordBuffers, getGL, DeviceManagerWorkerData);
};
export var initData = initDataUtils;
//# sourceMappingURL=ArrayBufferWorkerSystem.js.map