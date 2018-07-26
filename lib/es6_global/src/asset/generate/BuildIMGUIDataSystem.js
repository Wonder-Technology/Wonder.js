

import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SerializeService$Wonderjs from "../../service/atom/SerializeService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";

function build(state) {
  var match = ManageIMGUIMainService$Wonderjs.getIMGUIFunc(state);
  return /* tuple */[
          ManageIMGUIMainService$Wonderjs.getCustomData(state),
          match !== undefined ? SerializeService$Wonderjs.serializeFunction(Js_primitive.valFromOption(match)) : undefined
        ];
}

export {
  build ,
  
}
/* ManageIMGUIMainService-Wonderjs Not a pure module */
