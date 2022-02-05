

import * as ArrayMapUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, geometry) {
  ArrayMapUtils$WonderCommonlib.addValue(state.gameObjectsMap, geometry, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectGeometryMap, gameObject, geometry);
  return state;
}

export {
  add ,
  
}
/* No side effect */
