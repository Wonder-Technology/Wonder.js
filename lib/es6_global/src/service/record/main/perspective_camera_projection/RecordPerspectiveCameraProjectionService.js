

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* index */0,
          /* dirtyArray */ArrayService$WonderCommonlib.createEmpty(/* () */0),
          /* pMatrixMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* nearMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* farMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* fovyMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* aspectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* dirtyArray */MutableSparseMapService$WonderCommonlib.copy(param[/* dirtyArray */1]),
          /* pMatrixMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfFloat32Array(param[/* pMatrixMap */2]),
          /* nearMap */MutableSparseMapService$WonderCommonlib.copy(param[/* nearMap */3]),
          /* farMap */MutableSparseMapService$WonderCommonlib.copy(param[/* farMap */4]),
          /* fovyMap */MutableSparseMapService$WonderCommonlib.copy(param[/* fovyMap */5]),
          /* aspectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* aspectMap */6]),
          /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(param[/* gameObjectMap */7]),
          /* disposedIndexArray */param[/* disposedIndexArray */8].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
