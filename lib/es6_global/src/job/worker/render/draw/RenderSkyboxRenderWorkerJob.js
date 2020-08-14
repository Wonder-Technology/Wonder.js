

import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as IsRenderUtils$Wonderjs from "./utils/IsRenderUtils.js";
import * as MessageService$Wonderjs from "../../../../service/primitive/worker/MessageService.js";
import * as RenderSkyboxJobUtils$Wonderjs from "../../../utils/RenderSkyboxJobUtils.js";
import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as CreateRenderStateRenderWorkerService$Wonderjs from "../../../../service/state/render_worker/render/CreateRenderStateRenderWorkerService.js";

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var data = MessageService$Wonderjs.getRecord(e);
                var match = IsRenderUtils$Wonderjs.isRender(data);
                if (match) {
                  var skyboxData = data.renderData.skyboxData;
                  var cubemapTextureOpt = skyboxData.cubemapTextureOpt;
                  var renderSkyboxGameObjectDataOpt = skyboxData.renderSkyboxGameObjectDataOpt;
                  RenderSkyboxJobUtils$Wonderjs.exec(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]), cubemapTextureOpt, renderSkyboxGameObjectDataOpt, CreateRenderStateRenderWorkerService$Wonderjs.createRenderState(state));
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
