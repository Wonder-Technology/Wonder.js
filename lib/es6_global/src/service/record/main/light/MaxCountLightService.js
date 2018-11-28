

import * as CountLightService$Wonderjs from "../../all/light/CountLightService.js";

function isMaxCount(renderLightArr, maxCount) {
  return CountLightService$Wonderjs.getLightCount(renderLightArr) >= maxCount;
}

export {
  isMaxCount ,
  
}
/* CountLightService-Wonderjs Not a pure module */
