

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ClearColorJobUtils$Wonderjs from "../../utils/ClearColorJobUtils.js";

function execJob(flags, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* deviceManagerRecord */9] = ClearColorJobUtils$Wonderjs.execJob(flags, state[/* deviceManagerRecord */9]);
  return newrecord;
}

export {
  execJob ,
  
}
/* ClearColorJobUtils-Wonderjs Not a pure module */
