

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function restore(_, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  var init = targetState[/* programRecord */27];
  newrecord[/* programRecord */27] = /* record */[
    /* programMap */init[/* programMap */0],
    /* lastUsedProgram */undefined
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
