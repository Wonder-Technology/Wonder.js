"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bufferUtils_1 = require("../../../buffer/bufferUtils");
var arrayUtils_1 = require("../../../../../utils/arrayUtils");
exports.disposeBuffer = function (geometryIndex, buffers, getGL, DeviceManagerDataFromSystem) {
    var gl = getGL(DeviceManagerDataFromSystem, null), buffer = buffers[geometryIndex];
    if (bufferUtils_1.isBufferExist(buffer)) {
        gl.deleteBuffer(buffers[geometryIndex]);
        arrayUtils_1.deleteVal(geometryIndex, buffers);
    }
};
//# sourceMappingURL=bufferUtils.js.map