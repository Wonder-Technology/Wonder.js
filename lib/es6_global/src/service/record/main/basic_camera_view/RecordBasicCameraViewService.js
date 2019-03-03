

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* index */0,
          /* isActiveMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* isActiveMap */MutableSparseMapService$WonderCommonlib.copy(param[/* isActiveMap */1]),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* gameObjectMap */2]),
          /* disposedIndexArray */param[/* disposedIndexArray */3].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
