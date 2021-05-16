

import * as BufferDirectionLightService$Wonderjs from "../../../../main/light/direction/BufferDirectionLightService.js";
import * as CountInitLightMaterialLightService$Wonderjs from "../CountInitLightMaterialLightService.js";

function getLightCount(param) {
  return CountInitLightMaterialLightService$Wonderjs.getLightCount(param[/* renderLightArr */1], BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  getLightCount ,
  
}
/* BufferDirectionLightService-Wonderjs Not a pure module */
