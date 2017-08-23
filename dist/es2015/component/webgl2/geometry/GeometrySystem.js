import { disposeComponent as disposeComponentSystem } from "../../geometry/GeometrySystem";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { GeometryData } from "../../geometry/GeometryData";
import { disposeBuffers } from "../../../renderer/webgl2/utils/worker/both_file/buffer/bufferUtils";
import { DeviceManagerData } from "../../../renderer/device/DeviceManagerData";
import { VaoData } from "../../../renderer/vao/VaoData";
import { addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";
import { disposeGeometryWorkerBuffers } from "../../../renderer/utils/buffer/bufferUtils";
export var addDisposeHandle = function (BoxGeometry, CustomGeometry) {
    addDisposeHandleToMap(BoxGeometry, disposeComponent);
    addDisposeHandleToMap(CustomGeometry, disposeComponent);
};
export var disposeComponent = function (component) {
    disposeComponentSystem(component, _disposeBuffers);
};
var _disposeBuffers = null;
if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = function (disposedIndexArray) {
        disposeGeometryWorkerBuffers(disposedIndexArray, GeometryData);
    };
}
else {
    _disposeBuffers = function (disposedIndexArray) {
        disposeBuffers(disposedIndexArray, DeviceManagerData, VaoData);
    };
}
//# sourceMappingURL=GeometrySystem.js.map