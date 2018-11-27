

import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var markIsSendTransformMatrixData = SparseMapService$WonderCommonlib.set;

function isSendTransformMatrixData(sourceInstance, isSendTransformMatrixDataMap) {
  var match = SparseMapService$WonderCommonlib.get(sourceInstance, isSendTransformMatrixDataMap);
  if (match !== undefined) {
    return match;
  } else {
    return false;
  }
}

export {
  markIsSendTransformMatrixData ,
  isSendTransformMatrixData ,
  
}
/* No side effect */
