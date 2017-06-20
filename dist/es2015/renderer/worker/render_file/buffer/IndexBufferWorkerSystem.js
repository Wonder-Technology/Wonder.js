import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../../../utils/buffer/indexBufferUtils";
import { getIndices } from "../geometry/GeometryWorkerSystem";
import { disposeBuffer as disposeBufferUtils } from "../../../utils/buffer/bufferUtils";
import { getGL } from "../../both_file/device/DeviceManagerWorkerSystem";
import { DeviceManagerWorkerData } from "../../both_file/device/DeviceManagerWorkerData";
export var getOrCreateBuffer = function (gl, geometryIndex, GeometryWorkerData, IndexBufferWorkerData) {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryWorkerData, IndexBufferWorkerData);
};
export var disposeBuffer = function (geometryIndex, IndexBufferWorkerData) {
    disposeBufferUtils(geometryIndex, IndexBufferWorkerData.buffers, getGL, DeviceManagerWorkerData);
};
export var initData = initDataUtils;
//# sourceMappingURL=IndexBufferWorkerSystem.js.map