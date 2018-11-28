

import * as OptionService$Wonderjs from "../../../../atom/OptionService.js";

function getPositionMap(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* positionMap */1]);
}

function getRenderLightArr(record) {
  return OptionService$Wonderjs.unsafeGet(record[/* renderLightArr */2]);
}

export {
  getPositionMap ,
  getRenderLightArr ,
  
}
/* OptionService-Wonderjs Not a pure module */
