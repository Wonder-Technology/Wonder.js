

import * as TimeControllerService$Wonderjs from "../../service/record/main/timeController/TimeControllerService.js";

function execJob(timeControllerRecord) {
  return TimeControllerService$Wonderjs.tick(TimeControllerService$Wonderjs.getElapsed(timeControllerRecord), timeControllerRecord);
}

export {
  execJob ,
  
}
/* TimeControllerService-Wonderjs Not a pure module */
