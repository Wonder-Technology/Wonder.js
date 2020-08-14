

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as JobConfigService$Wonderjs from "../../../../service/primitive/JobConfigService.js";
import * as ClearBufferJobUtils$Wonderjs from "../../../utils/ClearBufferJobUtils.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]);
                state[/* deviceManagerRecord */4] = DeviceManagerService$Wonderjs.clearBuffer(gl, ClearBufferJobUtils$Wonderjs.getBit(gl, JobConfigService$Wonderjs.unsafeGetFlags(flags)), state[/* deviceManagerRecord */4]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
