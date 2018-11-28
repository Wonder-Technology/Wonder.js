

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

var getIndicesType = SparseMapService$WonderCommonlib.get;

function unsafeGetIndicesType(index, indicesTypeMap) {
  return OptionService$Wonderjs.unsafeGet(SparseMapService$WonderCommonlib.get(index, indicesTypeMap));
}

var setIndicesType = SparseMapService$WonderCommonlib.set;

export {
  getIndicesType ,
  unsafeGetIndicesType ,
  setIndicesType ,
  
}
/* OptionService-Wonderjs Not a pure module */
