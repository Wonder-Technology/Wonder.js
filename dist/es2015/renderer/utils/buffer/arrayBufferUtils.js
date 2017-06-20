import { EBufferType } from "../../enum/EBufferType";
import { isBufferExist } from "./bufferUtils";
import { createMap } from "../../../utils/objectUtils";
export var getOrCreateBuffer = function (gl, geometryIndex, bufferType, getVertices, GeometryWorkerData, ArrayBufferDataFromSystem) {
    var buffers = ArrayBufferDataFromSystem.buffers, buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getVertices(geometryIndex, GeometryWorkerData), buffer);
    ArrayBufferDataFromSystem.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType.FLOAT
    };
    return buffer;
};
var _initBuffer = function (gl, data, buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl);
};
var _resetBindedBuffer = function (gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
export var initData = function (ArrayBufferDataFromSystemFromSystem) {
    ArrayBufferDataFromSystemFromSystem.buffers = [];
    ArrayBufferDataFromSystemFromSystem.bufferDataMap = createMap();
};
//# sourceMappingURL=arrayBufferUtils.js.map