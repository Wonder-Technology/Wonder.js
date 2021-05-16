

import * as DisposeJob$Wonderjs from "../../../../../../src/job/no_worker/loop/DisposeJob.js";
import * as ReallocateMemoryTool$Wonderjs from "../../../../../tool/reallocate/ReallocateMemoryTool.js";

function disposeAndReallocate(state) {
  return ReallocateMemoryTool$Wonderjs.reallocateAll(DisposeJob$Wonderjs.execJob(undefined, state));
}

export {
  disposeAndReallocate ,
  
}
/* DisposeJob-Wonderjs Not a pure module */
