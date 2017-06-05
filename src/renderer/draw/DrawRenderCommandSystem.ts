import curry from "wonder-lodash/curry";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";
import { RenderCommandBufferWorkerData } from "../command/RenderCommandBufferData";

export var draw = curry((RenderWorkerData:any, data:RenderCommandBufferWorkerData) => {
    RenderWorkerData.renderWorker.postMessage({
        operateType:EWorkerOperateType.DRAW,
        bufferData:data
    })
})

