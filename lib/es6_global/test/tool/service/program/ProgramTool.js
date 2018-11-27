

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ProgramService$Wonderjs from "../../../../src/service/record/all/program/ProgramService.js";

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

export {
  getProgramRecord ,
  getProgram ,
  clearLastUsedProgram ,
  setLastUsedProgram ,
  
}
/* ProgramService-Wonderjs Not a pure module */
