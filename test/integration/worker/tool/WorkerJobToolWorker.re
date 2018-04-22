open Js.Promise;

let getMainInitJobStream = WorkerJobMainService.getMainInitJobStream;

let getMainLoopJobStream = WorkerJobMainService.getMainLoopJobStream;

let getRenderWorkerJobStreamArr = WorkerJobMainService.getRenderWorkerJobStreamArr;

/* let init = WorkerJobMainService.init; */
/* let execInitJobs = WorkerJobMainService.execWorkerInitJobs;

   let execLoopJobs = WorkerJobMainService.execWorkerLoopJobs;

   let getWorkerInitJobList = WorkerJobMainService._getWorkerInitJobList;

   let getWorkerLoopJobList = WorkerJobMainService._getWorkerLoopJobList;

   let isJobExistInJobList = (targetName, jobList) =>
     jobList |> List.exists(((name, _)) => name === targetName); */
let execMainWorkerJob = (~execJobFunc, ~completeFunc, ~flag=Some([|""|]), ()) =>
  execJobFunc(flag, MainStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(MainStateTool.unsafeGetState()));