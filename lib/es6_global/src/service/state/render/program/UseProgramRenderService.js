

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function use(gl, program, state) {
  var programRecord = state[/* programRecord */4];
  var match = programRecord[/* lastUsedProgram */1];
  var exit = 0;
  if (match !== undefined && program === Js_primitive.valFromOption(match)) {
    return state;
  } else {
    exit = 1;
  }
  if (exit === 1) {
    programRecord[/* lastUsedProgram */1] = Js_primitive.some(program);
    gl.useProgram(program);
    return state;
  }
  
}

export {
  use ,
  
}
/* No side effect */
