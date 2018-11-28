

import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* dirtyArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* pMatrixMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* nearMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* farMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* fovyMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* aspectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* dirtyArray */SparseMapService$Wonderjs.copy(param[/* dirtyArray */1]),
          /* pMatrixMap */CopyTypeArrayService$Wonderjs.deepCopyFloat32ArrayArray(param[/* pMatrixMap */2]),
          /* nearMap */SparseMapService$Wonderjs.copy(param[/* nearMap */3]),
          /* farMap */SparseMapService$Wonderjs.copy(param[/* farMap */4]),
          /* fovyMap */SparseMapService$Wonderjs.copy(param[/* fovyMap */5]),
          /* aspectMap */SparseMapService$Wonderjs.copy(param[/* aspectMap */6]),
          /* gameObjectMap */SparseMapService$Wonderjs.copy(param[/* gameObjectMap */7]),
          /* disposedIndexArray */param[/* disposedIndexArray */8].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
