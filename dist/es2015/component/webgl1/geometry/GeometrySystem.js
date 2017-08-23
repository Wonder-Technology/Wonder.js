import { disposeComponent as disposeComponentSystem } from "../../geometry/GeometrySystem";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { GeometryData } from "../../geometry/GeometryData";
import { ArrayBufferData } from "../../../renderer/buffer/ArrayBufferData";
import { IndexBufferData } from "../../../renderer/buffer/IndexBufferData";
import { disposeBuffers } from "../../../renderer/webgl1/utils/worker/both_file/buffer/bufferUtils";
import { disposeBuffer as disposeArrayBuffer } from "../../../renderer/buffer/ArrayBufferSystem";
import { disposeBuffer as disposeIndexBuffer } from "../../../renderer/buffer/IndexBufferSystem";
import { GPUDetectData } from "../../../renderer/device/GPUDetectData";
import { VaoData } from "../../../renderer/vao/VaoData";
import { addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";
import { disposeGeometryWorkerBuffers } from "../../../renderer/utils/buffer/bufferUtils";
import { DeviceManagerData } from "../../../renderer/device/DeviceManagerData";
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
        disposeBuffers(disposedIndexArray, disposeArrayBuffer, disposeIndexBuffer, GPUDetectData, VaoData, ArrayBufferData, IndexBufferData, DeviceManagerData);
    };
}
//# sourceMappingURL=GeometrySystem.js.map