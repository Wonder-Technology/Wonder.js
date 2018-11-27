

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";

function getDirectionMap(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* directionMap */1]);
}

function getRenderLightArr(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* renderLightArr */2]);
}

export {
  getDirectionMap ,
  getRenderLightArr ,
  
}
/* OptionService-Wonderjs Not a pure module */
