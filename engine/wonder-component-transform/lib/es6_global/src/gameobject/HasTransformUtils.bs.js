

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function has(param, gameObject) {
  return MutableSparseMap$WonderCommonlib.has(param.gameObjectTransformMap, gameObject);
}

export {
  has ,
  
}
/* No side effect */
