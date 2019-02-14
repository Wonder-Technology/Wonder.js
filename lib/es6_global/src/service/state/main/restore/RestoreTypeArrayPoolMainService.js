

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function restore(_, param, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* typeArrayPoolRecord */35] = /* record */[
    /* float32ArrayPoolMap */param[/* float32ArrayPoolMap */1],
    /* uint16ArrayPoolMap */param[/* uint16ArrayPoolMap */2]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
