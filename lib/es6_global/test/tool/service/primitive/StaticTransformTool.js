

import * as SourceInstanceTool$Wonderjs from "../instance/SourceInstanceTool.js";
import * as StaticTransformService$Wonderjs from "../../../../src/service/primitive/instance/StaticTransformService.js";

function isTransformStatic(sourceInstance, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  return StaticTransformService$Wonderjs.isTransformStatic(sourceInstance, match[/* isTransformStatics */3]);
}

function markModelMatrixIsStatic(sourceInstance, isStatic, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  StaticTransformService$Wonderjs.markModelMatrixIsStatic(sourceInstance, isStatic, match[/* isTransformStatics */3]);
  return state;
}

export {
  isTransformStatic ,
  markModelMatrixIsStatic ,
  
}
/* SourceInstanceTool-Wonderjs Not a pure module */
