

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function setMaxTextureUnit(maxTextureUnit, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */3];
  newrecord[/* gpuDetectRecord */3] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */init[/* precision */2],
    /* maxTextureUnit */maxTextureUnit
  ];
  return newrecord;
}

export {
  setMaxTextureUnit ,
  
}
/* No side effect */
