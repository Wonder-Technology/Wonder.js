

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function doesGameObjectHasIsRootData(gameObjectIndex, gameObjects) {
  return Js_option.isSome(MutableSparseMapService$WonderCommonlib.get(gameObjectIndex, gameObjects[/* isRoots */2]));
}

function unsafeGetGameObjectIsRootData(gameObjectIndex, gameObjects) {
  return MutableSparseMapService$WonderCommonlib.unsafeGet(gameObjectIndex, gameObjects[/* isRoots */2]);
}

export {
  doesGameObjectHasIsRootData ,
  unsafeGetGameObjectIsRootData ,
  
}
/* No side effect */
