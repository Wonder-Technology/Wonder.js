"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../utils/objectUtils");
var arrayUtils_1 = require("../../../utils/arrayUtils");
exports.isBufferExist = function (buffer) { return objectUtils_1.isValidMapValue(buffer); };
exports.disposeBuffer = function (geometryIndex, buffers, getGL, DeviceManagerDataFromSystem) {
    var gl = getGL(DeviceManagerDataFromSystem, null), buffer = buffers[geometryIndex];
    if (exports.isBufferExist(buffer)) {
        gl.deleteBuffer(buffers[geometryIndex]);
        arrayUtils_1.deleteVal(geometryIndex, buffers);
    }
};
//# sourceMappingURL=bufferUtils.js.map