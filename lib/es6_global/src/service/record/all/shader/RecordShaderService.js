

import * as HashMapService$Wonderjs from "../../../atom/HashMapService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function create() {
  return /* record */[
          /* index */0,
          /* shaderIndexMap */HashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* materialsMap */SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* usedShaderIndexArray : array */[]
        ];
}

function deepCopyForRestore(param) {
  var index = param[/* index */0];
  var shaderIndexMap = param[/* shaderIndexMap */1];
  var materialsMap = param[/* materialsMap */2];
  var usedShaderIndexArray = param[/* usedShaderIndexArray */3];
  return /* record */[
          /* index */index,
          /* shaderIndexMap */HashMapService$Wonderjs.copy(shaderIndexMap),
          /* materialsMap */CopyTypeArrayService$Wonderjs.deepCopyArrayArray(materialsMap),
          /* usedShaderIndexArray */usedShaderIndexArray.slice()
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* HashMapService-Wonderjs Not a pure module */
