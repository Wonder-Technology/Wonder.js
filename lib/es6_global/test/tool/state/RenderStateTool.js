

import * as RenderRecordTool$Wonderjs from "../render/RenderRecordTool.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../src/service/state/main/render/CreateRenderStateMainService.js";

function createState(state) {
  var match = RenderRecordTool$Wonderjs.isCameraRecordExist(state);
  if (match) {
    return CreateRenderStateMainService$Wonderjs.createRenderState(state);
  } else {
    return CreateRenderStateMainService$Wonderjs.createRenderState(RenderRecordTool$Wonderjs.setCameraRecord(1, state));
  }
}

export {
  createState ,
  
}
/* RenderRecordTool-Wonderjs Not a pure module */
