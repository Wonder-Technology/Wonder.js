

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getRecord(state) {
  return state[/* gpuDetectRecord */5];
}

function setPrecision(precision, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* precision */precision,
    /* maxTextureUnit */init[/* maxTextureUnit */2]
  ];
  return newrecord;
}

export {
  getRecord ,
  setPrecision ,
  
}
/* No side effect */
