

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ShaderLibShaderIndexShaderService$Wonderjs from "../../../record/all/shader/ShaderLibShaderIndexShaderService.js";

function clearInitShaderCache(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* shaderRecord */26] = ShaderLibShaderIndexShaderService$Wonderjs.clearShaderIndexMap(state[/* shaderRecord */26]);
  return newrecord;
}

export {
  clearInitShaderCache ,
  
}
/* No side effect */
