"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeometrySystem_1 = require("../../geometry/GeometrySystem");
var WorkerDetectSystem_1 = require("../../../device/WorkerDetectSystem");
var GeometryData_1 = require("../../geometry/GeometryData");
var bufferUtils_1 = require("../../../renderer/webgl2/utils/worker/both_file/buffer/bufferUtils");
var DeviceManagerData_1 = require("../../../renderer/device/DeviceManagerData");
var VaoData_1 = require("../../../renderer/vao/VaoData");
var ComponentSystem_1 = require("../../ComponentSystem");
var bufferUtils_2 = require("../../../renderer/utils/buffer/bufferUtils");
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
        bufferUtils_1.disposeBuffers(disposedIndexArray, DeviceManagerData_1.DeviceManagerData, VaoData_1.VaoData);
    };
}
//# sourceMappingURL=GeometrySystem.js.map