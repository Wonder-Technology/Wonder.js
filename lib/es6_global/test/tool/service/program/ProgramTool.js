

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ProgramService$Wonderjs from "../../../../src/service/record/all/program/ProgramService.js";

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

export {
  getProgramRecord ,
  getProgram ,
  clearLastUsedProgram ,
  
}
/* ProgramService-Wonderjs Not a pure module */
