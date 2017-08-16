import { CameraRenderCommandBufferForDrawData } from "../../../utils/worker/render_file/type/dataType";

export type WorkerRenderCommandBufferForDrawData = {
    cameraData: CameraRenderCommandBufferForDrawData;
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
