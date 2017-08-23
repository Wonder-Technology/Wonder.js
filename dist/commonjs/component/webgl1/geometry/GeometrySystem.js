"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometrySystem_1 = require("../../geometry/GeometrySystem");
var WorkerDetectSystem_1 = require("../../../device/WorkerDetectSystem");
var GeometryData_1 = require("../../geometry/GeometryData");
var ArrayBufferData_1 = require("../../../renderer/buffer/ArrayBufferData");
var IndexBufferData_1 = require("../../../renderer/buffer/IndexBufferData");
var bufferUtils_1 = require("../../../renderer/webgl1/utils/worker/both_file/buffer/bufferUtils");
var ArrayBufferSystem_1 = require("../../../renderer/buffer/ArrayBufferSystem");
var IndexBufferSystem_1 = require("../../../renderer/buffer/IndexBufferSystem");
var GPUDetectData_1 = require("../../../renderer/device/GPUDetectData");
var VaoData_1 = require("../../../renderer/vao/VaoData");
var ComponentSystem_1 = require("../../ComponentSystem");
var bufferUtils_2 = require("../../../renderer/utils/buffer/bufferUtils");
var DeviceManagerData_1 = require("../../../renderer/device/DeviceManagerData");
exports.addDisposeHandle = function (BoxGeometry, CustomGeometry) {
    ComponentSystem_1.addDisposeHandle(BoxGeometry, exports.disposeComponent);
    ComponentSystem_1.addDisposeHandle(CustomGeometry, exports.disposeComponent);
};
exports.disposeComponent = function (component) {
    GeometrySystem_1.disposeComponent(component, _disposeBuffers);
};
var _disposeBuffers = null;
if (WorkerDetectSystem_1.isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = function (disposedIndexArray) {
        bufferUtils_2.disposeGeometryWorkerBuffers(disposedIndexArray, GeometryData_1.GeometryData);
    };
}
else {
    _disposeBuffers = function (disposedIndexArray) {
        bufferUtils_1.disposeBuffers(disposedIndexArray, ArrayBufferSystem_1.disposeBuffer, IndexBufferSystem_1.disposeBuffer, GPUDetectData_1.GPUDetectData, VaoData_1.VaoData, ArrayBufferData_1.ArrayBufferData, IndexBufferData_1.IndexBufferData, DeviceManagerData_1.DeviceManagerData);
    };
}
//# sourceMappingURL=GeometrySystem.js.map