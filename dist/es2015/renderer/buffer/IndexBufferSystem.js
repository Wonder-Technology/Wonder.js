import { getOrCreateBuffer as getOrCreateBufferUtils, initData as initDataUtils } from "../utils/buffer/indexBufferUtils";
import { getIndices } from "../../component/geometry/GeometrySystem";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { disposeBuffer as disposeBufferUtils } from "../utils/buffer/bufferUtils";
export var getOrCreateBuffer = function (gl, geometryIndex, GeometryData, IndexBufferData) {
    return getOrCreateBufferUtils(gl, geometryIndex, getIndices, GeometryData, IndexBufferData);
};
export var initData = initDataUtils;
export var disposeBuffer = function (geometryIndex, IndexBufferData) {
    disposeBufferUtils(geometryIndex, IndexBufferData.buffers, getGL, DeviceManagerData);
};
//# sourceMappingURL=IndexBufferSystem.js.map