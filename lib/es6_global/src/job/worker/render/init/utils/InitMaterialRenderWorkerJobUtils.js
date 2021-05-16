

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../../service/record/all/device/AllDeviceManagerService.js";
import * as JudgeInstanceRenderWorkerService$Wonderjs from "../../../../../service/state/render_worker/instance/JudgeInstanceRenderWorkerService.js";

function initMaterials(param, isSourceInstanceMap, state) {
  Curry._3(param[1], AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), /* tuple */[
        isSourceInstanceMap,
        JudgeInstanceRenderWorkerService$Wonderjs.isSupportInstance(state)
      ], Curry._1(param[0], state));
  return state;
}

export {
  initMaterials ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
