

import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, light) {
  MutableSparseMap$WonderCommonlib.set(state.gameObjectMap, light, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectDirectionLightMap, gameObject, light);
  return state;
}

export {
  add ,
  
}
/* No side effect */
