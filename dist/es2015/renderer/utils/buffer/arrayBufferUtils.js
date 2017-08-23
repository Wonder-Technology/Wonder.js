import { isBufferExist } from "./bufferUtils";
export var getOrCreateBuffer = function (gl, geometryIndex, buffers, getDatas, GeometryDataFromSystem) {
    var buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getDatas(geometryIndex, GeometryDataFromSystem), buffer);
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
    ArrayBufferDataFromSystemFromSystem.vertexBuffers = [];
    ArrayBufferDataFromSystemFromSystem.normalBuffers = [];
    ArrayBufferDataFromSystemFromSystem.texCoordBuffers = [];
};
//# sourceMappingURL=arrayBufferUtils.js.map