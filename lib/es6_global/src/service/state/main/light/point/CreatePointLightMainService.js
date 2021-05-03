

import * as CreatePointLightService$Wonderjs from "../../../../record/main/light/point/CreatePointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "./RecordPointLightMainService.js";

function create(isRenderLight, state) {
  var match = CreatePointLightService$Wonderjs.create(isRenderLight, RecordPointLightMainService$Wonderjs.getRecord(state));
  state[/* pointLightRecord */22] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* CreatePointLightService-Wonderjs Not a pure module */
