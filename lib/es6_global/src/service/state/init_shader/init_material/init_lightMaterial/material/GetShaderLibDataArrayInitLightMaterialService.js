

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ArrayService$Wonderjs from "../../../../../atom/ArrayService.js";
import * as TextureIndexService$Wonderjs from "../../../../../primitive/material/TextureIndexService.js";
import * as OperateTypeArrayAllLightMaterialService$Wonderjs from "../../../../../record/all/material/light/OperateTypeArrayAllLightMaterialService.js";
import * as GetShaderLibDataArrayInitMaterialAllService$Wonderjs from "../../all/material/GetShaderLibDataArrayInitMaterialAllService.js";

function _getMaterialShaderLibDataArrByStaticBranch(param, param$1, resultDataArr) {
  var staticBranchs = param$1[0];
  var name = param[0];
  var exit = 0;
  switch (name) {
    case "modelMatrix_instance" : 
    case "normalMatrix_instance" : 
        exit = 1;
        break;
    default:
      return GetShaderLibDataArrayInitMaterialAllService$Wonderjs.handleUnknownNameWhenGetMaterialShaderLibDataArrByStaticBranch(name, staticBranchs);
  }
  if (exit === 1) {
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
  }
  
}

function _isPass(materialIndex, condition, state) {
  var materialRecord = state[/* materialRecord */0];
  switch (condition) {
    case "has_diffuse_map" : 
        return TextureIndexService$Wonderjs.isTextureNotDefaultValue(OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(materialIndex, materialRecord[/* diffuseTextureIndices */3]));
    case "has_specular_map" : 
        return TextureIndexService$Wonderjs.isTextureNotDefaultValue(OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(materialIndex, materialRecord[/* specularTextureIndices */4]));
    case "light_has_map" : 
        if (TextureIndexService$Wonderjs.isTextureNotDefaultValue(OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(materialIndex, materialRecord[/* diffuseTextureIndices */3]))) {
          return true;
        } else {
          return TextureIndexService$Wonderjs.isTextureNotDefaultValue(OperateTypeArrayAllLightMaterialService$Wonderjs.getTextureIndex(materialIndex, materialRecord[/* specularTextureIndices */4]));
        }
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_isPass", "unknown condition:" + (String(condition) + ""), "", "", ""));
  }
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
/* Log-WonderLog Not a pure module */
