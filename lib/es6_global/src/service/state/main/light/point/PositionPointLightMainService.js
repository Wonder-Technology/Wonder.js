

import * as PositionLightMainService$Wonderjs from "../PositionLightMainService.js";
import * as GameObjectPointLightService$Wonderjs from "../../../../record/main/light/point/GameObjectPointLightService.js";
import * as RecordPointLightMainService$Wonderjs from "./RecordPointLightMainService.js";

function getPosition(index, state) {
  return PositionLightMainService$Wonderjs.getPosition(GameObjectPointLightService$Wonderjs.unsafeGetGameObject(index, RecordPointLightMainService$Wonderjs.getRecord(state)), state);
}

export {
  getPosition ,
  
}
/* PositionLightMainService-Wonderjs Not a pure module */
