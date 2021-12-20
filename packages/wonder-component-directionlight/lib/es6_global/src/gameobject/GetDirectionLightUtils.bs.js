

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param, gameObject) {
  return MutableSparseMap$WonderCommonlib.getNullable(param.gameObjectDirectionLightMap, gameObject);
}

export {
  get ,
  
}
/* No side effect */
