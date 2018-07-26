'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");

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

exports.getRecord = getRecord;
exports.setPrecision = setPrecision;
/* No side effect */
