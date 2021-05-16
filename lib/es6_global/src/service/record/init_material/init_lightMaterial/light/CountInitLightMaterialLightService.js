

import * as CountLightService$Wonderjs from "../../../../primitive/light/CountLightService.js";

function getLightCount(renderLightArr, bufferMaxCount) {
  var __x = CountLightService$Wonderjs.getLightCount(renderLightArr);
  return CountLightService$Wonderjs.checkNotExceedMaxCount(__x, bufferMaxCount);
}

export {
  getLightCount ,
  
}
/* CountLightService-Wonderjs Not a pure module */
