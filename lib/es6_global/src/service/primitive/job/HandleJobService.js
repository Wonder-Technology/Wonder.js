

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

var createJobHandleMap = MutableHashMapService$WonderCommonlib.fromList;

function concatJobHandleMaps(handleMap1, handleMap2) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultHandleMap, param) {
                return MutableHashMapService$WonderCommonlib.set(param[0], param[1], resultHandleMap);
              }), MutableHashMapService$WonderCommonlib.createEmpty(/* () */0), MutableHashMapService$WonderCommonlib.entries(handleMap1).concat(MutableHashMapService$WonderCommonlib.entries(handleMap2)));
}

export {
  createJobHandleMap ,
  concatJobHandleMaps ,
  
}
/* No side effect */
