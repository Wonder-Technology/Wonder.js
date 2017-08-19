import { disposeVao } from "../../render_file/vao/vaoUtils";
import { getExtensionVao } from "../../render_file/device/gpuDetectUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { disposeGeometryVboBuffers } from "../../../../../utils/worker/both_file/buffer/bufferUtils";

export var disposeBuffers = (disposedIndexArray: Array<number>, disposeArrayBuffer:Function, disposeIndexBuffer:Function, GPUDetectDataFromSystem:any, VaoDataFromSystem:any, ArrayBufferDataFromSystem:any, IndexBufferDataFromSystem:any) => {
    var extension = getExtensionVao(GPUDetectDataFromSystem);

    if(hasExtension(extension)) {
        disposeGeometryVaoBuffers(extension, disposedIndexArray, VaoDataFromSystem);
    }
    else{
        disposeGeometryVboBuffers(disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer);
    }
}

export var disposeGeometryVaoBuffers = (extension:any, disposedIndexArray: Array<number>, {
    vaos
}) => {
    for (let index of disposedIndexArray) {
        disposeVao(extension, vaos[index]);
    }
}
