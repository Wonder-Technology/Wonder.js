

import * as CreateDirectionLightService$Wonderjs from "../../../../record/main/light/direction/CreateDirectionLightService.js";
import * as RecordDirectionLightMainService$Wonderjs from "./RecordDirectionLightMainService.js";

function create(isRenderLight, state) {
  var match = CreateDirectionLightService$Wonderjs.create(isRenderLight, RecordDirectionLightMainService$Wonderjs.getRecord(state));
  state[/* directionLightRecord */20] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

export {
  create ,
  
}
/* CreateDirectionLightService-Wonderjs Not a pure module */
