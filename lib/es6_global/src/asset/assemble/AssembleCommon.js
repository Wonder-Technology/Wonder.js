

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function addChildrenToParent(parent, children, param) {
  return /* tuple */[
          ArrayService$WonderCommonlib.reduceOneParam((function (parentMap, child) {
                  return MutableSparseMapService$WonderCommonlib.set(child, parent, parentMap);
                }), param[0], children),
          MutableSparseMapService$WonderCommonlib.set(parent, children, param[1])
        ];
}

export {
  addChildrenToParent ,
  
}
/* No side effect */
