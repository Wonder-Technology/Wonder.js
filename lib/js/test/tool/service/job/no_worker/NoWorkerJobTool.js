'use strict';

var List = require("bs-platform/lib/js/list.js");
var NoWorkerJobMainService$Wonderjs = require("../../../../../src/service/state/main/job/no_worker/NoWorkerJobMainService.js");

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

exports.init = init;
exports.execInitJobs = execInitJobs;
exports.execLoopJobs = execLoopJobs;
exports.getNoWorkerInitJobList = getNoWorkerInitJobList;
exports.getNoWorkerLoopJobList = getNoWorkerLoopJobList;
exports.isJobExistInJobList = isJobExistInJobList;
/* NoWorkerJobMainService-Wonderjs Not a pure module */
