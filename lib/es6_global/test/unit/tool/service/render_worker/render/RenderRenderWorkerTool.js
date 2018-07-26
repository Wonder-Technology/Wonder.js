

import * as OptionService$Wonderjs from "../../../../../../src/service/atom/OptionService.js";
import * as OperateRenderRenderWorkerService$Wonderjs from "../../../../../../src/service/state/render_worker/render/OperateRenderRenderWorkerService.js";

function unsafeGetBasicRenderObjectRecord(state) {
  return OptionService$Wonderjs.unsafeGet(OperateRenderRenderWorkerService$Wonderjs.getBasicRenderObjectRecord(state));
}

var getBasicRenderObjectRecord = OperateRenderRenderWorkerService$Wonderjs.getBasicRenderObjectRecord;

export {
  getBasicRenderObjectRecord ,
  unsafeGetBasicRenderObjectRecord ,
  
}
/* OptionService-Wonderjs Not a pure module */
