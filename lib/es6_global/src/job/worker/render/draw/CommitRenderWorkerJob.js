

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as CommitGlService$Wonderjs from "../../../../service/primitive/gl/CommitGlService.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]);
                CommitGlService$Wonderjs.commit(gl);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
