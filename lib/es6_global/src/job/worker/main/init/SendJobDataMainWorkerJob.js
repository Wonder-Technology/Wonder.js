

import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as MostUtils$Wonderjs from "../../../../asset/utils/MostUtils.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as JobConfigUtils$Wonderjs from "../../utils/JobConfigUtils.js";
import * as StateDataMainService$Wonderjs from "../../../../service/state/main/state/StateDataMainService.js";
import * as WorkerInstanceService$Wonderjs from "../../../../service/record/main/workerInstance/WorkerInstanceService.js";
import * as OperateRenderWorkerJobService$Wonderjs from "../../../../service/record/main/workerJob/OperateRenderWorkerJobService.js";

function execJob(flags, stateData) {
  return MostUtils$Wonderjs.callFunc((function (param) {
                var state = StateDataMainService$Wonderjs.unsafeGetState(stateData);
                var operateType = JobConfigUtils$Wonderjs.getOperateType(flags);
                WorkerService$Wonderjs.postMessage({
                      operateType: operateType,
                      pipelineJobs: JSON.stringify(OperateRenderWorkerJobService$Wonderjs.getRenderWorkerPipelineJobs(state[/* workerJobRecord */3])),
                      jobs: JSON.stringify(OperateRenderWorkerJobService$Wonderjs.getWorkerJobs(state[/* workerJobRecord */3]))
                    }, WorkerInstanceService$Wonderjs.unsafeGetRenderWorker(state[/* workerInstanceRecord */37]));
                return Caml_option.some(operateType);
              }));
}

export {
  execJob ,
  
}
/* MostUtils-Wonderjs Not a pure module */
