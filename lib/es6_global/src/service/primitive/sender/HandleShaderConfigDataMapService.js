

import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function getOrCreateHashMap(map) {
  if (map !== undefined) {
    return Caml_option.valFromOption(map);
  } else {
    return MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  }
}

export {
  getOrCreateHashMap ,
  
}
/* No side effect */
