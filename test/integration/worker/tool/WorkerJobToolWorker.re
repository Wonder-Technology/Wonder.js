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
/* let execMainWorkerJobWithDefaultData = (execJobFunc, completeFunc) =>
   execJobFunc(Some([|""|]), MainStateTool.getStateData())
   |> Most.drain
   |> then_(() => completeFunc(MainStateTool.unsafeGetState())); */
let execMainWorkerJob = (~execJobFunc, ~completeFunc, ~flag=Some([|""|]), ()) =>
  execJobFunc(flag, MainStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(MainStateTool.unsafeGetState()));

let execRenderWorkerJob =
    (~execJobFunc, ~completeFunc, ~e=Some({"data": {}}), ~flag=Some([|""|]), ()) =>
  execJobFunc(flag, e, RenderWorkerStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(RenderWorkerStateTool.getState()));