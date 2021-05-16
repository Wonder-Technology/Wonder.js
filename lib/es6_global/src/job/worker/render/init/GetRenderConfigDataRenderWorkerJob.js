

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as RecordRenderConfigService$Wonderjs from "../../../../service/record/main/renderConfig/RecordRenderConfigService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var renderConfigData = data.renderConfigData;
                state[/* renderConfigRecord */2] = RecordRenderConfigService$Wonderjs.create(/* tuple */[
                      JSON.parse(renderConfigData.shaders),
                      JSON.parse(renderConfigData.shaderLibs)
                    ]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
