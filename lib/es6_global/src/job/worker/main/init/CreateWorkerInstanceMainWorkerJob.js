

import * as Most from "most";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as OperateRenderWorkerJobService$Wonderjs from "../../../../service/record/main/workerJob/OperateRenderWorkerJobService.js";

function execJob(param, stateData) {
  var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
  state[/* workerInstanceRecord */39] = WorkerInstanceService$Wonderjs.initWorkInstances(OperateRenderWorkerJobService$Wonderjs.getSetting(state[/* workerJobRecord */3])[/* workerFileDir */0], state[/* workerInstanceRecord */39]);
  StateDataMainService$Wonderjs.setState(stateData, state);
  return Most.just(undefined);
}

export {
  execJob ,
  
}
/* most Not a pure module */
