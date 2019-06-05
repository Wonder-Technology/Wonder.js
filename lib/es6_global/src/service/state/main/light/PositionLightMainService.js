

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../transform/UpdateTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "./point/RecordPointLightMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getPosition(gameObject, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return UpdateTransformMainService$Wonderjs.updateAndGetPositionTuple(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(gameObject, gameObjectRecord), state[/* globalTempRecord */35], RecordTransformMainService$Wonderjs.getRecord(state));
}

function buildPositionMap(getPositionFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, i) {
                return MutableSparseMapService$WonderCommonlib.set(i, Curry._2(getPositionFunc, i, state), map);
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), RecordPointLightMainService$Wonderjs.getRecord(state)[/* renderLightArr */8]);
}

export {
  getPosition ,
  buildPositionMap ,
  
}
/* RecordTransformMainService-Wonderjs Not a pure module */
