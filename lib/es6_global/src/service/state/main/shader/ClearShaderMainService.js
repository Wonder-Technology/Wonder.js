

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderLibShaderIndexAllShaderService$Wonderjs from "../../../record/all/shader/ShaderLibShaderIndexAllShaderService.js";

function clearInitShaderCache(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* shaderRecord */28] = ShaderLibShaderIndexAllShaderService$Wonderjs.clearShaderIndexMap(state[/* shaderRecord */28]);
  return newrecord;
}

export {
  clearInitShaderCache ,
  
}
/* No side effect */
