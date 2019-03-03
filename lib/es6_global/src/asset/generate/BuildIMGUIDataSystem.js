

import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as SerializeService$Wonderjs from "../../service/atom/SerializeService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";

function build(state) {
  var match = ManageIMGUIMainService$Wonderjs.getIMGUIFunc(state);
  return /* tuple */[
          SerializeService$Wonderjs.serializeValueWithFunction(ManageIMGUIMainService$Wonderjs.getCustomData(state)),
          match !== undefined ? SerializeService$Wonderjs.serializeFunction(Caml_option.valFromOption(match)) : undefined
        ];
}

export {
  build ,
  
}
/* ManageIMGUIMainService-Wonderjs Not a pure module */
