

import * as RenderBasicJobUtils$Wonderjs from "../../../utils/render/RenderBasicJobUtils.js";
import * as DeviceManagerService$Wonderjs from "../../../../service/record/all/device/DeviceManagerService.js";
import * as OperateRenderMainService$Wonderjs from "../../../../service/state/main/render/OperateRenderMainService.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../service/state/main/render/CreateRenderStateMainService.js";

function _render(gl, state) {
  var match = OperateRenderMainService$Wonderjs.getBasicRenderObjectRecord(state);
  if (match !== undefined) {
    var match$1 = match;
    RenderBasicJobUtils$Wonderjs.render(gl, /* tuple */[
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
  return _render(DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]), state);
}

export {
  _render ,
  execJob ,
  
}
/* RenderBasicJobUtils-Wonderjs Not a pure module */
