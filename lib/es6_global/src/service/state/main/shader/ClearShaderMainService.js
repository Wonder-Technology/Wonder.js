

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderLibShaderIndexShaderService$Wonderjs from "../../../record/all/shader/ShaderLibShaderIndexShaderService.js";

function clearInitShaderCache(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* shaderRecord */25] = ShaderLibShaderIndexShaderService$Wonderjs.clearShaderIndexMap(state[/* shaderRecord */25]);
  return newrecord;
}

export {
  clearInitShaderCache ,
  
}
/* ShaderLibShaderIndexShaderService-Wonderjs Not a pure module */
