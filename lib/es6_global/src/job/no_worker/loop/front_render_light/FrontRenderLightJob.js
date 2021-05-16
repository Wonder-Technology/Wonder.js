

import * as AllDeviceManagerService$Wonderjs from "../../../../service/record/all/device/AllDeviceManagerService.js";
import * as FrontRenderLightJobUtils$Wonderjs from "../../../utils/render/FrontRenderLightJobUtils.js";
import * as OperateRenderMainService$Wonderjs from "../../../../service/state/main/render/OperateRenderMainService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../service/state/main/render/CreateRenderStateMainService.js";

function _render(gl, state) {
  var match = OperateRenderMainService$Wonderjs.getLightRenderObjectRecord(state);
  if (match !== undefined) {
    var match$1 = match;
    FrontRenderLightJobUtils$Wonderjs.render(gl, /* tuple */[
          match$1[/* renderIndexArray */1],
          match$1[/* transformIndices */2],
          match$1[/* materialIndices */3],
          match$1[/* meshRendererIndices */4],
          match$1[/* geometryIndices */5],
          match$1[/* sourceInstanceIndices */6]
        ], CreateRenderStateMainService$Wonderjs.createRenderState(state));
    return state;
  } else {
    return state;
  }
}

function execJob(flags, state) {
  return _render(AllDeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), state);
}

export {
  _render ,
  execJob ,
  
}
/* AllDeviceManagerService-Wonderjs Not a pure module */
