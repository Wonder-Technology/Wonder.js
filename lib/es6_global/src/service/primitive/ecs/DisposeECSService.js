

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function buildMapFromArray(array, map) {
  ArrayService$WonderCommonlib.forEach((function (value) {
          MutableSparseMapService$WonderCommonlib.set(value, true, map);
          return /* () */0;
        }), array);
  return map;
}

export {
  buildMapFromArray ,
  
}
/* No side effect */
