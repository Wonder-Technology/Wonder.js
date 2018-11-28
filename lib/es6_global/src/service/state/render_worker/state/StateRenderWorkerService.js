

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function setState(stateData, state) {
  stateData[/* state */0] = state;
  return state;
}

function unsafeGetState(stateData) {
  return OptionService$Wonderjs.unsafeGet(stateData[/* state */0]);
}

export {
  setState ,
  unsafeGetState ,
  
}
/* OptionService-Wonderjs Not a pure module */
