

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as IsRenderUtils$Wonderjs from "./utils/IsRenderUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as SendUniformShaderDataJobUtils$Wonderjs from "../../../utils/SendUniformShaderDataJobUtils.js";
import * as CreateRenderStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/render/CreateRenderStateRenderWorkerService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var match = IsRenderUtils$Wonderjs.isRender(MessageService$Wonderjs.getRecord(e));
                if (match) {
                  SendUniformShaderDataJobUtils$Wonderjs.execJob(CreateRenderStateRenderWorkerService$Wonderjs.createRenderState(state));
                  StateRenderWorkerService$Wonderjs.setState(stateData, state);
                  return e;
                } else {
                  return e;
                }
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
