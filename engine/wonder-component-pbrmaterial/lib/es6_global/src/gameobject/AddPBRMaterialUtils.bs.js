

import * as ArrayMapUtils$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/component/ArrayMapUtils.bs.js";
import * as MutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/MutableSparseMap.bs.js";

function add(state, gameObject, material) {
  ArrayMapUtils$WonderCommonlib.addValue(state.gameObjectsMap, material, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectPBRMaterialMap, gameObject, material);
  return state;
}

export {
  add ,
  
}
/* No side effect */
