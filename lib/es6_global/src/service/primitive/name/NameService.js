

import * as OptionService$Wonderjs from "../../atom/OptionService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getName = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetName(id, nameMap) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(id, nameMap));
}

var setName = MutableSparseMapService$WonderCommonlib.set;

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* OptionService-Wonderjs Not a pure module */
