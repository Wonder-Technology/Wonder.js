open StateDataMainType;

let prepare = () =>
  WorkerWorkerTool.setFakeWorkersAndSetState(MainStateTool.unsafeGetState());

let test = (sandbox, getWorkerFunc, judgeFunc, state) => {
  open Js.Promise;
  let worker = getWorkerFunc(state);
  let postMessageToWorker = WorkerWorkerTool.stubPostMessage(sandbox, worker);

  MainStateTool.unsafeGetState()
  |> WorkerJobWorkerTool.getMainInitJobStream(
       MainStateTool.getStateData(),
       (
         WorkerJobHandleSystem.createMainInitJobHandleMap,
         WorkerJobHandleSystem.getMainInitJobHandle,
       ),
     )
  |> WonderBsMost.Most.forEach(data =>
       switch (data) {
       | Some("SEND_JOB_DATA") =>
         EventWorkerTool.triggerWorkerEvent(
           worker,
           "message",
           {
             "data": {
               "operateType": "FINISH_SEND_JOB_DATA",
             },
           },
         )
         |> ignore
       | Some("INIT_RENDER") =>
         EventWorkerTool.triggerWorkerEvent(
           worker,
           "message",
           {
             "data": {
               "operateType": "FINISH_INIT_RENDER",
             },
           },
         )
         |> ignore
       | _ => ()
       }
     )
  |> then_(() => judgeFunc(postMessageToWorker) |> resolve);
};