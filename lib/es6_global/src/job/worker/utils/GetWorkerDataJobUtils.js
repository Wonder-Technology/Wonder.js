

import * as GetWorkerDataUtils$Wonderjs from "./GetWorkerDataUtils.js";
import * as StateDataMainService$Wonderjs from "../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../service/record/main/workerInstance/WorkerInstanceService.js";

function execNoDataJob(flags, stateData) {
  return GetWorkerDataUtils$Wonderjs.createGetOtherWorkerNoDataStream(flags, WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(StateDataMainService$Wonderjs.unsafeGetState(stateData)[/* workerInstanceRecord */39]));
}

function createGetOtherWorkerDataStream(flags, stateData) {
  return GetWorkerDataUtils$Wonderjs.createGetOtherWorkerDataStream(flags, WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(StateDataMainService$Wonderjs.unsafeGetState(stateData)[/* workerInstanceRecord */39]));
}

export {
  execNoDataJob ,
  createGetOtherWorkerDataStream ,
  
}
/* GetWorkerDataUtils-Wonderjs Not a pure module */
