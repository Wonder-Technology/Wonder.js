

import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function get(param, gameObject) {
  return ImmutableSparseMap$WonderCommonlib.unsafeGet(param.gameObjectBasicCameraViewMap, gameObject);
}

export {
  get ,
  
}
/* No side effect */
