

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param, light) {
  var gameObject = MutableSparseMap$WonderCommonlib.get(param.gameObjectMap, light);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

export {
  get ,
  
}
/* No side effect */
