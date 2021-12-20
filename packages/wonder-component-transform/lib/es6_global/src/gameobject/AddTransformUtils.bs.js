

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, transform) {
  MutableSparseMap$WonderCommonlib.set(state.gameObjectMap, transform, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectTransformMap, gameObject, transform);
  return state;
}

export {
  add ,
  
}
/* No side effect */
