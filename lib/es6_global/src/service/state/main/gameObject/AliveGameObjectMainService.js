

import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isAlive(uid, param) {
  var gameObjectRecord = param[/* gameObjectRecord */10];
  var disposedUidMap = gameObjectRecord[/* disposedUidMap */3];
  var transformMap = gameObjectRecord[/* transformMap */22];
  var match = SparseMapService$WonderCommonlib.has(uid, disposedUidMap);
  if (match) {
    return false;
  } else {
    var match$1 = SparseMapService$WonderCommonlib.has(uid, transformMap);
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
/* No side effect */
