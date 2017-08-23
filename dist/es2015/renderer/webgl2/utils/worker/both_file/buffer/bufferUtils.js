import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getGL } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
export var disposeBuffers = function (disposedIndexArray, DeviceManagerDataFromSystem, VaoDataFromSystem) {
    disposeGeometryVaoBuffers(getGL(DeviceManagerDataFromSystem, null), disposedIndexArray, VaoDataFromSystem);
};
export var disposeGeometryVaoBuffers = function (gl, disposedIndexArray, _a) {
    var vaoMap = _a.vaoMap, vboArrayMap = _a.vboArrayMap;
    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
        var index = disposedIndexArray_1[_i];
        disposeVao(gl, index, vaoMap, vboArrayMap);
    }
};
//# sourceMappingURL=bufferUtils.js.map