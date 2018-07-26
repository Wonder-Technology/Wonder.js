

import * as SparseMapService$Wonderjs from "../../../atom/SparseMapService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* basicMaterialRenderGameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* lightMaterialRenderGameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* gameObjectMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  return /* record */[
          /* index */param[/* index */0],
          /* basicMaterialRenderGameObjectMap */SparseMapService$Wonderjs.copy(param[/* basicMaterialRenderGameObjectMap */1]),
          /* lightMaterialRenderGameObjectMap */SparseMapService$Wonderjs.copy(param[/* lightMaterialRenderGameObjectMap */2]),
          /* gameObjectMap */SparseMapService$Wonderjs.copy(param[/* gameObjectMap */3]),
          /* disposedIndexArray */param[/* disposedIndexArray */4].slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* SparseMapService-Wonderjs Not a pure module */
