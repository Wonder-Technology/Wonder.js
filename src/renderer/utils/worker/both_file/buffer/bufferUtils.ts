export var disposeGeometryVboBuffers = (disposedIndexArray: Array<number>, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, disposeArrayBuffer: Function, disposeIndexBuffer: Function) => {
    for (let index of disposedIndexArray) {
        disposeArrayBuffer(index, ArrayBufferDataFromSystem);
        disposeIndexBuffer(index, IndexBufferDataFromSystem);
    }
}
