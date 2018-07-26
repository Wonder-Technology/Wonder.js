

import * as TimeControllerService$Wonderjs from "../service/record/main/timeController/TimeControllerService.js";

function getGameTime(state) {
  return TimeControllerService$Wonderjs.getGameTime(state[/* timeControllerRecord */33]);
}

function getFps(state) {
  return TimeControllerService$Wonderjs.getFps(state[/* timeControllerRecord */33]);
}

export {
  getGameTime ,
  getFps ,
  
}
/* TimeControllerService-Wonderjs Not a pure module */
