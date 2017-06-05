//todo define shared buffer

export type RenderCommandBufferWorkerData = {
    buffer:SharedArrayBuffer;
    count:number
}

export type RenderCommandUniformData = {
    mMatrices:Float32Array;
    vMatrices:Float32Array;
    pMatrices:Float32Array;
    materialIndex:number;
}
