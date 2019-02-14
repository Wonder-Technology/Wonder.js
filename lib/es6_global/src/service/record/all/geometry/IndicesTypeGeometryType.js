

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var getIndicesType = MutableSparseMapService$WonderCommonlib.get;

function unsafeGetIndicesType(index, indicesTypeMap) {
  return OptionService$Wonderjs.unsafeGet(MutableSparseMapService$WonderCommonlib.get(index, indicesTypeMap));
}

var setIndicesType = MutableSparseMapService$WonderCommonlib.set;

export {
  getIndicesType ,
  unsafeGetIndicesType ,
  setIndicesType ,
  
}
/* OptionService-Wonderjs Not a pure module */
