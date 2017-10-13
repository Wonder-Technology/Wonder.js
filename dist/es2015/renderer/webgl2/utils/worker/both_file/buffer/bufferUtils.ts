import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getGL } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";

export const disposeBuffers = (disposedIndexArray: Array<number>, DeviceManagerDataFromSystem: any, VaoDataFromSystem: any) => {
    disposeGeometryVaoBuffers(getGL(DeviceManagerDataFromSystem, null), disposedIndexArray, VaoDataFromSystem);
}

export const disposeGeometryVaoBuffers = (gl: any, disposedIndexArray: Array<number>, {
    vaoMap,
    vboArrayMap
}) => {
    for (let index of disposedIndexArray) {
        disposeVao(gl, index, vaoMap, vboArrayMap);
    }
}
