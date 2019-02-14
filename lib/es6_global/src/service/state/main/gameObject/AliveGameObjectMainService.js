

import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function isAlive(uid, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var transformMap = gameObjectRecord[/* transformMap */24];
  var match = MutableSparseMapService$WonderCommonlib.has(uid, disposedUidMap);
  if (match) {
    return false;
  } else {
    var match$1 = MutableSparseMapService$WonderCommonlib.has(uid, transformMap);
    if (match$1) {
      return true;
    } else {
      return false;
    }
  }
}

export {
  isAlive ,
  
}
/* MutableSparseMapService-WonderCommonlib Not a pure module */
