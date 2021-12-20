

import * as ArraySt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param, geometry) {
  return ArraySt$WonderCommonlib.map(OptionSt$WonderCommonlib.getWithDefault(MutableSparseMap$WonderCommonlib.get(param.gameObjectsMap, geometry), []), (function (prim) {
                return prim;
              }));
}

export {
  get ,
  
}
/* No side effect */
