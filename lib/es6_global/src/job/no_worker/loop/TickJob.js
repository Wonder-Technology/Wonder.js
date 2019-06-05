

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TickJobUtils$Wonderjs from "../../utils/TickJobUtils.js";

function execJob(flags, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* timeControllerRecord */33] = TickJobUtils$Wonderjs.execJob(state[/* timeControllerRecord */33]);
  return newrecord;
}

export {
  execJob ,
  
}
/* TickJobUtils-Wonderjs Not a pure module */
