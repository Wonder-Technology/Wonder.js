

import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var markIsSendTransformMatrixData = MutableSparseMapService$WonderCommonlib.set;

function isSendTransformMatrixData(sourceInstance, isSendTransformMatrixDataMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(sourceInstance, isSendTransformMatrixDataMap);
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
