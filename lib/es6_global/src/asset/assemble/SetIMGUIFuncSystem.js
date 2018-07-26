

import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as SerializeService$Wonderjs from "../../service/atom/SerializeService.js";
import * as ManageIMGUIMainService$Wonderjs from "../../service/state/main/imgui/ManageIMGUIMainService.js";

function setIMGUIFunc(param, state) {
  var scene = param[/* scene */1];
  var match = OptionService$Wonderjs.isJsonSerializedValueNone(scene[/* imgui */2]);
  if (match) {
    return state;
  } else {
    var match$1 = OptionService$Wonderjs.unsafeGetJsonSerializedValue(scene[/* imgui */2]);
    return ManageIMGUIMainService$Wonderjs.setIMGUIFunc(match$1[/* customData */1], SerializeService$Wonderjs.deserializeFunction(match$1[/* imguiFunc */0]), state);
  }
}

export {
  setIMGUIFunc ,
  
}
/* OptionService-Wonderjs Not a pure module */
