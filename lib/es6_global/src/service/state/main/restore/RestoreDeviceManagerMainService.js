

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function restore(_, param, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  var init = targetState[/* deviceManagerRecord */9];
  newrecord[/* deviceManagerRecord */9] = /* record */[
    /* gl */Js_primitive.some(param[/* gl */0]),
    /* colorWrite */init[/* colorWrite */1],
    /* clearColor */init[/* clearColor */2],
    /* side */init[/* side */3],
    /* depthTest */init[/* depthTest */4],
    /* scissorTest */init[/* scissorTest */5],
    /* scissor */init[/* scissor */6],
    /* viewport */init[/* viewport */7]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
