open StateDataMainType;

let prepare = () => WorkerToolWorker.setFakeWorkersAndSetState(MainStateTool.unsafeGetState());

let test = (sandbox, getWorkerFunc, judgeFunc, state) => {
  open Js.Promise;
  let worker = getWorkerFunc(state);
  let postMessageToWorker = WorkerToolWorker.stubPostMessage(sandbox, worker);
  MainStateTool.unsafeGetState()
  |> WorkerJobToolWorker.getMainInitJobStream(
       MainStateTool.getStateData(),
       (
         WorkerJobHandleSystem.createMainInitJobHandleMap,
         WorkerJobHandleSystem.getMainInitJobHandle
       )
     )
  |> Most.forEach(
       (record) =>
         switch record {
         | Some("SEND_JOB_DATA") =>
           EventToolWorker.triggerWorkerEvent(
             worker,
             "message",
             {"data": {"operateType": "FINISH_SEND_JOB_DATA"}}
           )
           |> ignore
         | Some("INIT_RENDER") =>
           EventToolWorker.triggerWorkerEvent(
             worker,
             "message",
             {"data": {"operateType": "FINISH_INIT_RENDER"}}
           )
           |> ignore
         | _ => ()
         }
     )
  |> then_(() => judgeFunc(postMessageToWorker) |> resolve)
};