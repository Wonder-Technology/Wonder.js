

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function get(param, transform) {
  var gameObject = MutableSparseMap$WonderCommonlib.get(param.gameObjectMap, transform);
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
