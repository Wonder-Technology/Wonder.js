"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaoUtils_1 = require("../../render_file/vao/vaoUtils");
var gpuDetectUtils_1 = require("../../render_file/device/gpuDetectUtils");
var gpuDetectUtils_2 = require("../../../../../utils/device/gpuDetectUtils");
var bufferUtils_1 = require("../../../../../utils/worker/both_file/buffer/bufferUtils");
var deviceManagerUtils_1 = require("../../../../../utils/worker/both_file/device/deviceManagerUtils");
exports.disposeBuffers = function (disposedIndexArray, disposeArrayBuffer, disposeIndexBuffer, GPUDetectDataFromSystem, VaoDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DeviceManagerDataFromSystem) {
    var extension = gpuDetectUtils_1.getExtensionVao(GPUDetectDataFromSystem);
    if (gpuDetectUtils_2.hasExtension(extension)) {
        exports.disposeGeometryVaoBuffers(extension, disposedIndexArray, DeviceManagerDataFromSystem, VaoDataFromSystem);
    }
    else {
        bufferUtils_1.disposeGeometryVboBuffers(disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer);
    }
};
exports.disposeGeometryVaoBuffers = function (extension, disposedIndexArray, DeviceManagerDataFromSystem, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    var gl = deviceManagerUtils_1.getGL(DeviceManagerDataFromSystem, null);
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        vaoUtils_1.disposeVao(gl, extension, index, vaoMap, vboArrayMap);
    }
};
//# sourceMappingURL=bufferUtils.js.map