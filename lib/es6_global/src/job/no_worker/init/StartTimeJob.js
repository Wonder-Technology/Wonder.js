

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as TimeControllerService$Wonderjs from "../../../service/record/main/timeController/TimeControllerService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* timeControllerRecord */35] = TimeControllerService$Wonderjs.start(state[/* timeControllerRecord */35]);
  return newrecord;
}

export {
  execJob ,
  
}
/* TimeControllerService-Wonderjs Not a pure module */
