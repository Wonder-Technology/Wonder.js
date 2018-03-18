open MainStateDataType;

let setFakeWorkers = (state) =>
  {
    ...state,
    workerInstanceRecord:
      WorkerInstanceToolMainWorker.setRenderWorker(
        state.workerInstanceRecord,
        WorkerToolWorker.createWorker()
      )
  }
  |> StateTool.setState;

let prepare = () => setFakeWorkers(StateTool.getState());

let test = (sandbox, getWorkerFunc, judgeFunc, state) => {
  open Js.Promise;
  let worker = getWorkerFunc(state);
  let postMessageToWorker = WorkerToolWorker.stubPostMessage(sandbox, worker);
  StateTool.getState()
  |> WorkerJobToolWorker.getMainInitJobStream(StateTool.getStateData())
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