

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as RenderTool$Wonderjs from "../service/render/RenderTool.js";
import * as OperateRenderMainService$Wonderjs from "../../../src/service/state/main/render/OperateRenderMainService.js";

function isCameraRecordExist(state) {
  return Js_option.isSome(RenderTool$Wonderjs.getRenderRecord(state)[/* cameraRecord */2]);
}

var setCameraRecord = OperateRenderMainService$Wonderjs.setCameraRecord;

export {
  isCameraRecordExist ,
  setCameraRecord ,
  
}
/* RenderTool-Wonderjs Not a pure module */
