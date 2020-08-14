

import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function create(param) {
  return /* record */[
          /* index */0,
          /* noMaterialShaderIndexMap */MutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* shaderLibShaderIndexMap */MutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* materialsMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ];
}

function deepCopyForRestore(param) {
  var index = param[/* index */0];
  var noMaterialShaderIndexMap = param[/* noMaterialShaderIndexMap */1];
  var shaderLibShaderIndexMap = param[/* shaderLibShaderIndexMap */2];
  var materialsMap = param[/* materialsMap */3];
  return /* record */[
          /* index */index,
          /* noMaterialShaderIndexMap */MutableHashMapService$WonderCommonlib.copy(noMaterialShaderIndexMap),
          /* shaderLibShaderIndexMap */MutableHashMapService$WonderCommonlib.copy(shaderLibShaderIndexMap),
          /* materialsMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(materialsMap)
        ];
}

export {
  create ,
  deepCopyForRestore ,
  
}
/* No side effect */
