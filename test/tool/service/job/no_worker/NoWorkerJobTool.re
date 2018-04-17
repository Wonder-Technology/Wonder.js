let init = NoWorkerJobMainService.init;

let execInitJobs = NoWorkerJobMainService.execNoWorkerInitJobs;

let execLoopJobs = NoWorkerJobMainService.execNoWorkerLoopJobs;

let getNoWorkerInitJobList = NoWorkerJobMainService._getNoWorkerInitJobList;

let getNoWorkerLoopJobList = NoWorkerJobMainService._getNoWorkerLoopJobList;

let isJobExistInJobList = (targetName, jobList) =>
  jobList |> List.exists(((name, _)) => name === targetName);