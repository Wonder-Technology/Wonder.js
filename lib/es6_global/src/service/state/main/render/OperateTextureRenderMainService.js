

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordRenderMainService$Wonderjs from "./RecordRenderMainService.js";
import * as OperateGPUDetectMainService$Wonderjs from "../../../record/main/gpu/OperateGPUDetectMainService.js";
import * as CreateActivableTextureUnitArrayService$Wonderjs from "../../../primitive/texture/CreateActivableTextureUnitArrayService.js";

function createActivableTextureUnitArray(state) {
  return CreateActivableTextureUnitArrayService$Wonderjs.create(OperateGPUDetectMainService$Wonderjs.unsafeGetMaxTextureUnit(state));
}

function _getData(state) {
  return RecordRenderMainService$Wonderjs.getRecord(state)[/* textureRecord */3];
}

function getActivableTextureUnitArray(state) {
  var match = RecordRenderMainService$Wonderjs.getRecord(state)[/* textureRecord */3];
  if (match !== undefined) {
    return match[/* activableTextureUnitArray */0];
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

export {
  createActivableTextureUnitArray ,
  _getData ,
  getActivableTextureUnitArray ,
  
}
/* RecordRenderMainService-Wonderjs Not a pure module */
