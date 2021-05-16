'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var AllProgramService$Wonderjs = require("../../../../src/service/record/all/program/AllProgramService.js");

function getProgramRecord(state) {
  return state[/* programRecord */30];
}

function getProgram(shaderIndex, state) {
  return AllProgramService$Wonderjs.getProgram(shaderIndex, state[/* programRecord */30]);
}

function unsafeGetProgram(shaderIndex, state) {
  return AllProgramService$Wonderjs.unsafeGetProgram(shaderIndex, state[/* programRecord */30]);
}

function clearLastUsedProgram(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* programRecord */30];
  newrecord[/* programRecord */30] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */undefined
  ];
  return newrecord;
}

function setLastUsedProgram(program, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* programRecord */30];
  newrecord[/* programRecord */30] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */Caml_option.some(program)
  ];
  return newrecord;
}

exports.getProgramRecord = getProgramRecord;
exports.getProgram = getProgram;
exports.unsafeGetProgram = unsafeGetProgram;
exports.clearLastUsedProgram = clearLastUsedProgram;
exports.setLastUsedProgram = setLastUsedProgram;
/* AllProgramService-Wonderjs Not a pure module */
