

import * as HashMapService$Wonderjs from "../../atom/HashMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

var createJobHandleMap = HashMapService$WonderCommonlib.fromList;

function concatJobHandleMaps(handleMap1, handleMap2) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultHandleMap, param) {
                return HashMapService$WonderCommonlib.set(param[0], param[1], resultHandleMap);
              }), HashMapService$WonderCommonlib.createEmpty(/* () */0), HashMapService$Wonderjs.entries(handleMap1).concat(HashMapService$Wonderjs.entries(handleMap2)));
}

export {
  createJobHandleMap ,
  concatJobHandleMaps ,
  
}
/* HashMapService-Wonderjs Not a pure module */
