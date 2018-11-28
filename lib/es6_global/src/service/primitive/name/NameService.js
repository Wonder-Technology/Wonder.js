

import * as OptionService$Wonderjs from "../../atom/OptionService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var getName = SparseMapService$WonderCommonlib.get;

function unsafeGetName(id, nameMap) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(id, nameMap));
}

var setName = SparseMapService$WonderCommonlib.set;

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* OptionService-Wonderjs Not a pure module */
