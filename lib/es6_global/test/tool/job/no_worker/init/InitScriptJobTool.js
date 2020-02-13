

import * as JobTool$Wonderjs from "../../../service/job/JobTool.js";
import * as InitScriptJob$Wonderjs from "../../../../../src/job/no_worker/init/InitScriptJob.js";

function exec(state) {
  return InitScriptJob$Wonderjs.execJob(JobTool$Wonderjs.getConfigRecord(/* () */0), state);
}

export {
  exec ,
  
}
/* InitScriptJob-Wonderjs Not a pure module */
