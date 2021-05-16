

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateGPUDetectRenderWorkerService$Wonderjs from "../../gpu/OperateGPUDetectRenderWorkerService.js";
import * as CreateActivableTextureUnitArrayService$Wonderjs from "../../../../primitive/texture/CreateActivableTextureUnitArrayService.js";

function _getData(state) {
  return state[/* allTextureRecord */18];
}

function getActivableTextureUnitArray(state) {
  var match = state[/* allTextureRecord */18];
  if (match !== undefined) {
    return match[/* activableTextureUnitArray */0];
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

function createActivableTextureUnitArray(state) {
  return CreateActivableTextureUnitArrayService$Wonderjs.create(OperateGPUDetectRenderWorkerService$Wonderjs.unsafeGetMaxTextureUnit(state));
}

export {
  _getData ,
  getActivableTextureUnitArray ,
  createActivableTextureUnitArray ,
  
}
/* OperateGPUDetectRenderWorkerService-Wonderjs Not a pure module */
