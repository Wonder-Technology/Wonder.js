

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ViewService$Wonderjs from "../../../service/record/main/device/ViewService.js";
import * as ScreenService$Wonderjs from "../../../service/primitive/device/ScreenService.js";

function execJob(param, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* viewRecord */8] = ViewService$Wonderjs.setCanvas(ScreenService$Wonderjs.setToFullScreen(ScreenService$Wonderjs.queryFullScreenData(/* () */0), ViewService$Wonderjs.unsafeGetCanvas(state[/* viewRecord */8])), state[/* viewRecord */8]);
  return newrecord;
}

export {
  execJob ,
  
}
/* ViewService-Wonderjs Not a pure module */
