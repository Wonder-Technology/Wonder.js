

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function getOrCreateHashMap(map) {
  if (map !== undefined) {
    return Js_primitive.valFromOption(map);
  } else {
    return MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  }
}

export {
  getOrCreateHashMap ,
  
}
/* MutableHashMapService-WonderCommonlib Not a pure module */
