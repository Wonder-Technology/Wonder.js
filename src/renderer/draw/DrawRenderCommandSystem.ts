import curry from "wonder-lodash/curry";
import { RenderCommand } from "../command/RenderCommand";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";

export var draw = curry((RenderWorkerData:any, renderCommandArray: Array<RenderCommand>) => {
    RenderWorkerData.renderWorker.postMessage({
        operateType:EWorkerOperateType.DRAW,
        renderCommandArray:renderCommandArray
        //todo optimize: transfer renderCommandArray
    // }, [renderCommandArray])
    })
})

