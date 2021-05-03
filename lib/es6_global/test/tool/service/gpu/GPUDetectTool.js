

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getRecord(state) {
  return state[/* gpuDetectRecord */5];
}

function setPrecision(precision, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */precision,
    /* maxTextureUnit */init[/* maxTextureUnit */3]
  ];
  return newrecord;
}

function setMaxTextureUnit(maxTextureUnit, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* gpuDetectRecord */5];
  newrecord[/* gpuDetectRecord */5] = /* record */[
    /* extensionInstancedArrays */init[/* extensionInstancedArrays */0],
    /* extensionElementIndexUint */init[/* extensionElementIndexUint */1],
    /* precision */init[/* precision */2],
    /* maxTextureUnit */maxTextureUnit
  ];
  return newrecord;
}

export {
  getRecord ,
  setPrecision ,
  setMaxTextureUnit ,
  
}
/* No side effect */
