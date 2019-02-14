

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function restore(_, param, targetState) {
  var newrecord = Caml_array.caml_array_dup(targetState);
  var init = targetState[/* deviceManagerRecord */9];
  newrecord[/* deviceManagerRecord */9] = /* record */[
    /* gl */Js_primitive.some(param[/* gl */0]),
    /* colorWrite */init[/* colorWrite */1],
    /* depthWrite */init[/* depthWrite */2],
    /* clearColor */init[/* clearColor */3],
    /* side */init[/* side */4],
    /* depthTest */init[/* depthTest */5],
    /* scissorTest */init[/* scissorTest */6],
    /* scissor */init[/* scissor */7],
    /* viewport */init[/* viewport */8]
  ];
  return newrecord;
}

export {
  restore ,
  
}
/* No side effect */
