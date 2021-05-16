

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Vector3Service$Wonderjs from "../../../../atom/Vector3Service.js";
import * as QuaternionService$Wonderjs from "../../../../atom/QuaternionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as RecordTransformMainService$Wonderjs from "../../transform/RecordTransformMainService.js";
import * as UpdateTransformMainService$Wonderjs from "../../transform/UpdateTransformMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as GameObjectDirectionLightService$Wonderjs from "../../../../record/main/light/direction/GameObjectDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "./RecordDirectionLightMainService.js";

function getDirection(index, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return Vector3Service$Wonderjs.transformQuat(/* tuple */[
              0,
              0,
              1
            ], QuaternionService$Wonderjs.setFromEulerAngles(UpdateTransformMainService$Wonderjs.updateAndGetEulerAnglesTuple(GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectDirectionLightService$Wonderjs.unsafeGetGameObject(index, RecordDirectionLightMainService$Wonderjs.getRecord(state)), gameObjectRecord), state[/* globalTempRecord */37], RecordTransformMainService$Wonderjs.getRecord(state))));
}

function buildDirectionMap(getDirectionFunc, state) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, i) {
                return MutableSparseMapService$WonderCommonlib.set(i, Curry._2(getDirectionFunc, i, state), map);
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), RecordDirectionLightMainService$Wonderjs.getRecord(state)[/* renderLightArr */4]);
}

export {
  getDirection ,
  buildDirectionMap ,
  
}
/* RecordTransformMainService-Wonderjs Not a pure module */
