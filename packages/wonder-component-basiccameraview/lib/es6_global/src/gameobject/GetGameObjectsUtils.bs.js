

import * as ImmutableSparseMap$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function get(param, cameraView) {
  var gameObject = ImmutableSparseMap$WonderCommonlib.get(param.gameObjectMap, cameraView);
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
