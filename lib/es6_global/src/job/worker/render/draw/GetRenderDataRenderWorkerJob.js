

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as WorkerService$Wonderjs from "../../../../service/primitive/worker/WorkerService.js";
import * as GetWorkerDataUtils$Wonderjs from "../../utils/GetWorkerDataUtils.js";

function execJob(flags, param, stateData) {
  return GetWorkerDataUtils$Wonderjs.createGetMainWorkerDataStream(flags, Curry._1(WorkerService$Wonderjs.getSelf, /* () */0));
}

export {
  execJob ,
  
}
/* WorkerService-Wonderjs Not a pure module */
