let setFakeWorkers = (state) =>
  WorkerInstanceToolMainWorker.setRenderWorker(state, WorkerToolWorker.createWorker())
  |> StateTool.setState;

let prepare = () => setFakeWorkers(StateTool.getState());

let test = (sandbox, judgeFunc, state) => {
  open Js.Promise;
  let renderWorker = WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker = WorkerToolWorker.stubPostMessage(sandbox, renderWorker);
  StateTool.getState()
  |> WorkerJobToolWorker.getMainInitJobStream(StateTool.getStateData())
  |> Most.forEach(
       (data) =>
         switch data {
         | Some("SEND_JOB_DATA") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"data": {"operateType": "FINISH_SEND_JOB_DATA"}}
           )
           |> ignore
         | Some("INIT_RENDER") =>
           EventToolWorker.triggerWorkerEvent(
             renderWorker,
             "message",
             {"data": {"operateType": "FINISH_INIT_RENDER"}}
           )
           |> ignore
         | _ => ()
         }
     )
  |> then_(() => judgeFunc(postMessageToRenderWorker) |> resolve)
};