

import * as CountLightService$Wonderjs from "../../../../all/light/CountLightService.js";
import * as BufferDirectionLightService$Wonderjs from "../../../../main/light/direction/BufferDirectionLightService.js";

function getLightCount(param) {
  var __x = CountLightService$Wonderjs.getLightCount(param[/* renderLightArr */1]);
  return CountLightService$Wonderjs.checkNotExceedMaxCount(__x, BufferDirectionLightService$Wonderjs.getBufferMaxCount(/* () */0));
}

export {
  getLightCount ,
  
}
/* CountLightService-Wonderjs Not a pure module */
