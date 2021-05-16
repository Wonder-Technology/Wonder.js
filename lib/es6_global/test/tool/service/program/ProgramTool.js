

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as AllProgramService$Wonderjs from "../../../../src/service/record/all/program/AllProgramService.js";

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

export {
  getProgramRecord ,
  getProgram ,
  unsafeGetProgram ,
  clearLastUsedProgram ,
  setLastUsedProgram ,
  
}
/* AllProgramService-Wonderjs Not a pure module */
