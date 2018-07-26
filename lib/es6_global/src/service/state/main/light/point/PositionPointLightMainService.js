

import * as PositionLightMainService$Wonderjs from "../PositionLightMainService.js";
import * as GameObjectPointLightService$Wonderjs from "../../../../record/main/light/point/GameObjectPointLightService.js";

function getPosition(index, state) {
  return PositionLightMainService$Wonderjs.getPosition(GameObjectPointLightService$Wonderjs.unsafeGetGameObject(index, state[/* pointLightRecord */21]), state);
}

export {
  getPosition ,
  
}
/* PositionLightMainService-Wonderjs Not a pure module */
