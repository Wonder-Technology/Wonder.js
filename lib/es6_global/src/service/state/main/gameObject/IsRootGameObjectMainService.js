

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getIsRoot(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return MutableSparseMapService$WonderCommonlib.get(uid, gameObjectRecord[/* isRootMap */2]);
}

function unsafeGetIsRoot(uid, state) {
  var match = getIsRoot(uid, state);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

function setIsRoot(uid, isRoot, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* isRootMap */2] = MutableSparseMapService$WonderCommonlib.set(uid, isRoot, gameObjectRecord[/* isRootMap */2]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

export {
  getIsRoot ,
  unsafeGetIsRoot ,
  setIsRoot ,
  
}
/* No side effect */
