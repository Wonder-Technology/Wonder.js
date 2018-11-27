

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderIndexShaderService$Wonderjs from "../../../record/all/shader/ShaderIndexShaderService.js";

function clearShaderCache(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* shaderRecord */25] = ShaderIndexShaderService$Wonderjs.clearShaderIndexMap(state[/* shaderRecord */25]);
  return newrecord;
}

export {
  clearShaderCache ,
  
}
/* ShaderIndexShaderService-Wonderjs Not a pure module */
