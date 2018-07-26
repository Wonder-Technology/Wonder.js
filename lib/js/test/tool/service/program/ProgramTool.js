'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ProgramService$Wonderjs = require("../../../../src/service/record/all/program/ProgramService.js");

function getProgramRecord(state) {
  return state[/* programRecord */28];
}

function getProgram(shaderIndex, state) {
  return ProgramService$Wonderjs.getProgram(shaderIndex, state[/* programRecord */28]);
}

function clearLastUsedProgram(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* programRecord */28];
  newrecord[/* programRecord */28] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */undefined
  ];
  return newrecord;
}

exports.getProgramRecord = getProgramRecord;
exports.getProgram = getProgram;
exports.clearLastUsedProgram = clearLastUsedProgram;
/* ProgramService-Wonderjs Not a pure module */
