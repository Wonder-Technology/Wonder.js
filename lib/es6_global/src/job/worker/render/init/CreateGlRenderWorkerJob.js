

import * as GlService$Wonderjs from "../../../../service/primitive/gl/GlService.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as ContextConfigSettingService$Wonderjs from "../../../../service/record/main/setting/ContextConfigSettingService.js";

function execJob(param, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var gl = GlService$Wonderjs.createGl(ContextConfigSettingService$Wonderjs.convertContextConfigDataToJsObj(data.contextConfig), data.canvas);
                state[/* deviceManagerRecord */4] = DeviceManagerService$Wonderjs.setGl(gl, state[/* deviceManagerRecord */4]);
                StateRenderWorkerService$Wonderjs.setState(stateData, state);
                return e;
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
