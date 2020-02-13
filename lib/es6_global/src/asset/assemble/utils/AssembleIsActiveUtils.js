

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function doesGameObjectHasIsActiveData(gameObjectIndex, gameObjects) {
  return Js_option.isSome(MutableSparseMapService$WonderCommonlib.get(gameObjectIndex, gameObjects[/* isActives */3]));
}

function unsafeGetGameObjectIsActiveData(gameObjectIndex, gameObjects) {
  return MutableSparseMapService$WonderCommonlib.unsafeGet(gameObjectIndex, gameObjects[/* isActives */3]);
}

export {
  doesGameObjectHasIsActiveData ,
  unsafeGetGameObjectIsActiveData ,
  
}
/* No side effect */
