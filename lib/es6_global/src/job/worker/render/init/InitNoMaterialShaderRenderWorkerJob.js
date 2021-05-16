

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as InitStateJobUtils$Wonderjs from "../../../utils/InitStateJobUtils.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as InitNoMaterialShaderJobUtils$Wonderjs from "../../../utils/InitNoMaterialShaderJobUtils.js";
import * as CreateInitNoMaterialShaderStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/shader/CreateInitNoMaterialShaderStateRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                state[/* deviceManagerRecord */4] = InitStateJobUtils$Wonderjs.execJob(state[/* deviceManagerRecord */4]);
                InitNoMaterialShaderJobUtils$Wonderjs.exec(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), CreateInitNoMaterialShaderStateRenderWorkerService$Wonderjs.createInitNoMaterialShaderState(state));
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
