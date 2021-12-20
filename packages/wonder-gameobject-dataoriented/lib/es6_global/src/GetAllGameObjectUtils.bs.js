

import * as ArraySt$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";

function getAll(state) {
  return ArraySt$WonderCommonlib.range(0, state.maxUID - 1 | 0);
}

export {
  getAll ,
  
}
/* No side effect */
