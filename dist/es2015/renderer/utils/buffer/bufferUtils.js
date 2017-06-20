import { isValidMapValue } from "../../../utils/objectUtils";
import { deleteVal } from "../../../utils/arrayUtils";
export var isBufferExist = function (buffer) { return isValidMapValue(buffer); };
export var disposeBuffer = function (geometryIndex, buffers, getGL, DeviceManagerDataFromSystem) {
    var gl = getGL(DeviceManagerDataFromSystem, null), buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        gl.deleteBuffer(buffers[geometryIndex]);
        deleteVal(geometryIndex, buffers);
    }
};
//# sourceMappingURL=bufferUtils.js.map