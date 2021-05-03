

import * as NullService$Wonderjs from "./NullService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function fastGet(key, map) {
  var value = MutableSparseMapService$WonderCommonlib.unsafeGet(key, map);
  return /* tuple */[
          NullService$Wonderjs.isInMap(value),
          value
        ];
}

export {
  fastGet ,
  
}
/* No side effect */
