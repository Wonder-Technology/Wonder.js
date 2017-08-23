import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getExtensionVao } from "../../render_file/device/gpuDetectUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { disposeGeometryVboBuffers } from "../../../../../utils/worker/both_file/buffer/bufferUtils";
import { getGL } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
export var disposeBuffers = function (disposedIndexArray, disposeArrayBuffer, disposeIndexBuffer, GPUDetectDataFromSystem, VaoDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DeviceManagerDataFromSystem) {
    var extension = getExtensionVao(GPUDetectDataFromSystem);
    if (hasExtension(extension)) {
        disposeGeometryVaoBuffers(extension, disposedIndexArray, DeviceManagerDataFromSystem, VaoDataFromSystem);
    }
    else {
        disposeGeometryVboBuffers(disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer);
    }
};
export var disposeGeometryVaoBuffers = function (extension, disposedIndexArray, DeviceManagerDataFromSystem, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    var gl = getGL(DeviceManagerDataFromSystem, null);
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        disposeVao(gl, extension, index, vaoMap, vboArrayMap);
    }
};
//# sourceMappingURL=bufferUtils.js.map