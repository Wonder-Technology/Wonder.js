

import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function getIsActive(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return MutableSparseMapService$WonderCommonlib.get(uid, gameObjectRecord[/* isActiveMap */3]);
}

function unsafeGetIsActive(uid, state) {
  var match = getIsActive(uid, state);
  if (match !== undefined) {
    return match;
  } else {
    return true;
  }
}

export {
  getIsActive ,
  unsafeGetIsActive ,
  
}
/* No side effect */
