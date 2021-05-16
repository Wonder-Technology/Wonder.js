

import * as OperateRenderWorkerSettingService$Wonderjs from "./OperateRenderWorkerSettingService.js";

function getMaxBigTypeArrayPoolSize(record) {
  return OperateRenderWorkerSettingService$Wonderjs.unsafeGetMemory(record)[/* maxBigTypeArrayPoolSize */0];
}

export {
  getMaxBigTypeArrayPoolSize ,
  
}
/* OperateRenderWorkerSettingService-Wonderjs Not a pure module */
