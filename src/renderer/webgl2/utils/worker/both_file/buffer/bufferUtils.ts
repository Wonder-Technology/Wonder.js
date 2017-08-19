import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getGL } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";

export var disposeBuffers = (disposedIndexArray: Array<number>, DeviceManagerDataFromSystem:any, VaoDataFromSystem:any) => {
    disposeGeometryVaoBuffers(getGL(DeviceManagerDataFromSystem, null), disposedIndexArray, VaoDataFromSystem);
}

export var disposeGeometryVaoBuffers = (gl:any, disposedIndexArray: Array<number>, {
    vaos
}) => {
    for (let index of disposedIndexArray) {
        disposeVao(gl, vaos[index]);
    }
}
