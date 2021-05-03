

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ClearLastSendComponentJobUtils$Wonderjs from "../../utils/ClearLastSendComponentJobUtils.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* glslSenderRecord */32] = ClearLastSendComponentJobUtils$Wonderjs.execJob(state[/* glslSenderRecord */32]);
  return newrecord;
}

export {
  execJob ,
  
}
/* No side effect */
