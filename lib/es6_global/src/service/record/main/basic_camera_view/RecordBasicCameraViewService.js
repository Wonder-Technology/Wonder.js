

import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* isActiveMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* isActiveMap */SparseMapService$Wonderjs.copy(param[/* isActiveMap */1]),
          /* gameObjectMap */SparseMapService$Wonderjs.copy(param[/* gameObjectMap */2]),
          /* disposedIndexArray */param[/* disposedIndexArray */3].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
