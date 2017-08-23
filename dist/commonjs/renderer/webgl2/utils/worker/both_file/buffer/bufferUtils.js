"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vaoUtils_1 = require("../../render_file/vao/vaoUtils");
var deviceManagerUtils_1 = require("../../../../../utils/worker/both_file/device/deviceManagerUtils");
exports.disposeBuffers = function (disposedIndexArray, DeviceManagerDataFromSystem, VaoDataFromSystem) {
    exports.disposeGeometryVaoBuffers(deviceManagerUtils_1.getGL(DeviceManagerDataFromSystem, null), disposedIndexArray, VaoDataFromSystem);
};
exports.disposeGeometryVaoBuffers = function (gl, disposedIndexArray, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        vaoUtils_1.disposeVao(gl, index, vaoMap, vboArrayMap);
    }
};
//# sourceMappingURL=bufferUtils.js.map