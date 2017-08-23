import { disposeComponent as disposeComponentSystem } from "../../geometry/GeometrySystem";
import { Geometry } from "../../geometry/Geometry";
import { isSupportRenderWorkerAndSharedArrayBuffer } from "../../../device/WorkerDetectSystem";
import { GeometryData } from "../../geometry/GeometryData";
import {
    disposeBuffers
} from "../../../renderer/webgl2/utils/worker/both_file/buffer/bufferUtils";
import { DeviceManagerData } from "../../../renderer/device/DeviceManagerData";
import { VaoData } from "../../../renderer/vao/VaoData";
import { addDisposeHandle as addDisposeHandleToMap } from "../../ComponentSystem";
import { disposeGeometryWorkerBuffers } from "../../../renderer/utils/buffer/bufferUtils";

export var addDisposeHandle = (BoxGeometry: any, CustomGeometry: any) => {
    addDisposeHandleToMap(BoxGeometry, disposeComponent);
    addDisposeHandleToMap(CustomGeometry, disposeComponent);
}

export var disposeComponent = (component: Geometry) => {
    disposeComponentSystem(component, _disposeBuffers);
}

var _disposeBuffers = null;

if (isSupportRenderWorkerAndSharedArrayBuffer()) {
    _disposeBuffers = (disposedIndexArray: Array<number>) => {
        disposeGeometryWorkerBuffers(disposedIndexArray, GeometryData);
    }
}
else {
    _disposeBuffers = (disposedIndexArray: Array<number>) => {
        disposeBuffers(disposedIndexArray, DeviceManagerData, VaoData);
    }
}
