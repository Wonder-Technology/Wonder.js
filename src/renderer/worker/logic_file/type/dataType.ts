export type WorkerRenderCommandBufferForDrawData = {
    basicData: BasicWorkerRenderCommandBufferForDrawData;
    lightData: LightWorkerRenderCommandBufferForDrawData;
}

export type BasicWorkerRenderCommandBufferForDrawData = {
    buffer: SharedArrayBuffer;
    count: number
}

export type LightWorkerRenderCommandBufferForDrawData = {
    buffer: SharedArrayBuffer;
    count: number
}
