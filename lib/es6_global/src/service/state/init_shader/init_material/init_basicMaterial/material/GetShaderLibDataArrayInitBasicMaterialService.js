

import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as GetShaderLibDataArrayInitMaterialAllService$Wonderjs from "../../all/material/GetShaderLibDataArrayInitMaterialAllService.js";

function _getMaterialShaderLibDataArrByStaticBranch(param, param$1, resultDataArr) {
  var staticBranchs = param$1[0];
  var name = param[0];
  if (name === "modelMatrix_instance") {
    var match = ArrayService$Wonderjs.unsafeFindFirst(staticBranchs, name, (function (item) {
            return item[/* name */0] === name;
          }));
    return GetShaderLibDataArrayInitMaterialAllService$Wonderjs.getMaterialShaderLibDataArrByStaticBranchInstance(/* tuple */[
                param[1],
                param[2]
              ], /* tuple */[
                param$1[1],
                match[/* value */1]
              ], resultDataArr);
  } else {
    return GetShaderLibDataArrayInitMaterialAllService$Wonderjs.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs);
  }
}

function _isPass(materialIndex, condition, state) {
  return true;
}

function getMaterialShaderLibDataArr(materialIndex, param, shaderLibTuple, state) {
  return GetShaderLibDataArrayInitMaterialAllService$Wonderjs.getMaterialShaderLibDataArr(/* tuple */[
              materialIndex,
              param[0],
              param[1]
            ], shaderLibTuple, /* tuple */[
              _getMaterialShaderLibDataArrByStaticBranch,
              _isPass
            ], state);
}

export {
  _getMaterialShaderLibDataArrByStaticBranch ,
  _isPass ,
  getMaterialShaderLibDataArr ,
  
}
/* ArrayService-Wonderjs Not a pure module */
