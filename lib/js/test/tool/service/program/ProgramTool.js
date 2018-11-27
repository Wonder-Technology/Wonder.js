'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var ProgramService$Wonderjs = require("../../../../src/service/record/all/program/ProgramService.js");

function getProgramRecord(state) {
  return state[/* programRecord */27];
}

function getProgram(shaderIndex, state) {
  return ProgramService$Wonderjs.getProgram(shaderIndex, state[/* programRecord */27]);
}

function clearLastUsedProgram(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* programRecord */27];
  newrecord[/* programRecord */27] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */undefined
  ];
  return newrecord;
}

function setLastUsedProgram(program, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* programRecord */27];
  newrecord[/* programRecord */27] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */Js_primitive.some(program)
  ];
  return newrecord;
}

exports.getProgramRecord = getProgramRecord;
exports.getProgram = getProgram;
exports.clearLastUsedProgram = clearLastUsedProgram;
exports.setLastUsedProgram = setLastUsedProgram;
/* ProgramService-Wonderjs Not a pure module */
