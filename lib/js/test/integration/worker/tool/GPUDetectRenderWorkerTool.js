'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");

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

exports.setMaxTextureUnit = setMaxTextureUnit;
/* No side effect */
