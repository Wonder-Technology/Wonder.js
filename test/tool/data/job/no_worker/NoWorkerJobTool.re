let init = NoWorkerJobSystem.init;

let execInitJobs = NoWorkerJobSystem.execNoWorkerInitJobs;

let execLoopJobs = NoWorkerJobSystem.execNoWorkerLoopJobs;

let getNoWorkerInitJobList = NoWorkerJobSystem._getNoWorkerInitJobList;

let getNoWorkerLoopJobList = NoWorkerJobSystem._getNoWorkerLoopJobList;

let isJobExistInJobList = (targetName, jobList) =>
  jobList |> List.exists(((name, _)) => name === targetName);