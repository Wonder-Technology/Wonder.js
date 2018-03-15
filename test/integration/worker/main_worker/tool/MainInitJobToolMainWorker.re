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

let test = (sandbox, judgeFunc, state) => {
  open Js.Promise;
  let renderWorker = WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker = WorkerToolWorker.stubPostMessage(sandbox, renderWorker);
  StateTool.getState()
  |> WorkerJobToolWorker.getMainInitJobStream(StateTool.getStateData())
  |> Most.forEach(
       (record) =>
         switch record {
         | Some("SEND_JOB_DATA") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"record": {"operateType": "FINISH_SEND_JOB_DATA"}}
           )
           |> ignore
         | Some("INIT_RENDER") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"record": {"operateType": "FINISH_INIT_RENDER"}}
           )
           |> ignore
         | _ => ()
         }
     )
  |> then_(() => judgeFunc(postMessageToRenderWorker) |> resolve)
};