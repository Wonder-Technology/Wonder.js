let init = NoWorkerJobService.init;

let execInitJobs = NoWorkerJobService.execNoWorkerInitJobs;

let execLoopJobs = NoWorkerJobService.execNoWorkerLoopJobs;

let getNoWorkerInitJobList = NoWorkerJobService._getNoWorkerInitJobList;

let getNoWorkerLoopJobList = NoWorkerJobService._getNoWorkerLoopJobList;

let isJobExistInJobList = (targetName, jobList) =>
  jobList |> List.exists(((name, _)) => name === targetName);