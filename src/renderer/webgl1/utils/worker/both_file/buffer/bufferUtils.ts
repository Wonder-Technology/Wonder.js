import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getExtensionVao } from "../../render_file/device/gpuDetectUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { disposeGeometryVboBuffers } from "../../../../../utils/worker/both_file/buffer/bufferUtils";
import { getGL } from "../../../../../utils/worker/both_file/device/deviceManagerUtils";

export const disposeBuffers = (disposedIndexArray: Array<number>, disposeArrayBuffer: Function, disposeIndexBuffer: Function, GPUDetectDataFromSystem: any, VaoDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, DeviceManagerDataFromSystem: any) => {
    var extension = getExtensionVao(GPUDetectDataFromSystem);

    if (hasExtension(extension)) {
        disposeGeometryVaoBuffers(extension, disposedIndexArray, DeviceManagerDataFromSystem, VaoDataFromSystem);
    }
    else {
        disposeGeometryVboBuffers(disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer);
    }
}

export const disposeGeometryVaoBuffers = (extension: any, disposedIndexArray: Array<number>, DeviceManagerDataFromSystem, {
    vaoMap,
    vboArrayMap
}) => {
    var gl = getGL(DeviceManagerDataFromSystem, null);

    for (let index of disposedIndexArray) {
        disposeVao(gl, extension, index, vaoMap, vboArrayMap);
    }
}
