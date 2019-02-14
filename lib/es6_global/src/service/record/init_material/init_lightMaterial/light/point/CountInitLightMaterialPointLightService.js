

import * as BufferPointLightService$Wonderjs from "../../../../main/light/point/BufferPointLightService.js";
import * as CountInitLightMaterialLightService$Wonderjs from "../CountInitLightMaterialLightService.js";

function getLightCount(param) {
  return CountInitLightMaterialLightService$Wonderjs.getLightCount(param[/* renderLightArr */1], BufferPointLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  getLightCount ,
  
}
/* BufferPointLightService-Wonderjs Not a pure module */
