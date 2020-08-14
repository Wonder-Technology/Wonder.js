

import * as MostUtils$Wonderjs from "../../../../../asset/utils/MostUtils.js";
import * as IsRenderUtils$Wonderjs from "../utils/IsRenderUtils.js";
import * as MessageService$Wonderjs from "../../../../../service/primitive/worker/MessageService.js";
import * as RenderBasicJobUtils$Wonderjs from "../../../../utils/render/RenderBasicJobUtils.js";
import * as DeviceManagerService$Wonderjs from "../../../../../service/record/all/device/DeviceManagerService.js";
import * as StateRenderWorkerService$Wonderjs from "../../../../../service/state/render_worker/state/StateRenderWorkerService.js";
import * as OperateRenderRenderWorkerService$Wonderjs from "../../../../../service/state/render_worker/render/OperateRenderRenderWorkerService.js";
import * as CreateRenderStateRenderWorkerService$Wonderjs from "../../../../../service/state/render_worker/render/CreateRenderStateRenderWorkerService.js";

function _render(gl, state) {
  var match = OperateRenderRenderWorkerService$Wonderjs.getBasicRenderObjectRecord(state);
  if (match !== undefined) {
    var match$1 = match;
    RenderBasicJobUtils$Wonderjs.render(gl, /* tuple */[
          match$1[/* renderIndexArray */0],
          match$1[/* transformIndices */1],
          match$1[/* materialIndices */2],
          match$1[/* meshRendererIndices */3],
          match$1[/* geometryIndices */4],
          match$1[/* sourceInstanceIndices */5]
        ], CreateRenderStateRenderWorkerService$Wonderjs.createRenderState(state));
    return state;
  } else {
    return state;
  }
}

function execJob(flags, e, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateRenderWorkerService$Wonderjs.unsafeGetState(stateData);
                var match = IsRenderUtils$Wonderjs.isRender(MessageService$Wonderjs.getRecord(e));
                if (match) {
                  var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */4]);
                  StateRenderWorkerService$Wonderjs.setState(stateData, _render(gl, state));
                  return e;
                } else {
                  return e;
                }
              }));
}

export {
  _render ,
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
