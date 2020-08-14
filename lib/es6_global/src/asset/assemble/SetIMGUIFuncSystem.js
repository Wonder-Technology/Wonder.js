

import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as SerializeService$Wonderjs from "../../service/atom/SerializeService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";

function setIMGUIFunc(param, state) {
  var match = OptionService$Wonderjs.unsafeGetJsonSerializedValue(param[/* scene */1][/* imgui */2]);
  return ManageIMGUIMainService$Wonderjs.setIMGUIFunc(SerializeService$Wonderjs.deserializeValueWithFunction(match[/* customData */1]), SerializeService$Wonderjs.deserializeFunction(match[/* imguiFunc */0]), state);
}

export {
  setIMGUIFunc ,
  
}
/* OptionService-Wonderjs Not a pure module */
