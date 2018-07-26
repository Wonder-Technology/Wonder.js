

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function getOrCreateHashMap(map) {
  if (map !== undefined) {
    return Js_primitive.valFromOption(map);
  } else {
    return HashMapService$WonderCommonlib.createEmpty(/* () */0);
  }
}

export {
  getOrCreateHashMap ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
