

import * as List from "../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as NoWorkerJobMainService$Wonderjs from "../../../../../src/service/state/main/job/no_worker/NoWorkerJobMainService.js";

function isJobExistInJobList(targetName, jobList) {
  return List.exists((function (param) {
                return param[0] === targetName;
              }), jobList);
}

var init = NoWorkerJobMainService$Wonderjs.init;

var execInitJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerInitJobs;

var execLoopJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs;

var getNoWorkerInitJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerInitJobList;

var getNoWorkerLoopJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerLoopJobList;

export {
  init ,
  execInitJobs ,
  execLoopJobs ,
  getNoWorkerInitJobList ,
  getNoWorkerLoopJobList ,
  isJobExistInJobList ,
  
}
/* NoWorkerJobMainService-Wonderjs Not a pure module */
