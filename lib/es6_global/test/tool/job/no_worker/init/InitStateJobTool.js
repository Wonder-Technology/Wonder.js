

import * as JobTool$Wonderjs from "../../../service/job/JobTool.js";
import * as InitStateJob$Wonderjs from "../../../../../src/job/no_worker/init/InitStateJob.js";

function exec(state) {
  return InitStateJob$Wonderjs.execJob(JobTool$Wonderjs.getConfigRecord(/* () */0), state);
}

export {
  exec ,
  
}
/* InitStateJob-Wonderjs Not a pure module */
