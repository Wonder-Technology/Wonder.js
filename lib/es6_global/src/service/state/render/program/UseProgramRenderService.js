

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as AllProgramService$Wonderjs from "../../../record/all/program/AllProgramService.js";

function _use(gl, program, state) {
  var programRecord = state[/* programRecord */4];
  var match = programRecord[/* lastUsedProgram */1];
  var exit = 0;
  if (match !== undefined && program === Caml_option.valFromOption(match)) {
    return state;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    programRecord[/* lastUsedProgram */1] = Caml_option.some(program);
    gl.useProgram(program);
    return state;
  }
  
}

function useByShaderIndex(gl, shaderIndex, state) {
  var program = AllProgramService$Wonderjs.unsafeGetProgram(shaderIndex, state[/* programRecord */4]);
  return _use(gl, program, state);
}

export {
  _use ,
  useByShaderIndex ,
  
}
/* AllProgramService-Wonderjs Not a pure module */
