open RenderWorkerType;

let onerrorHandler = (msg: string, fileName: string, lineno: int) =>
  WonderLog.Log.error(
    WonderLog.Log.buildErrorMessage(
      ~title="render worker error",
      ~description={j|$msg|j},
      ~reason="",
      ~solution={j||j},
      ~params={j|fileName:$(fileName)
        lineno:$(lineno)|j}
    )
  );

let _createAndSetWorkerState = () =>
  StateRenderWorkerService.setState(
    StateDataRenderWorker.renderWorkerStateData,
    CreateStateRenderWorkerService.createState()
  )
  |> ignore;

MostUtils.fromWorkerEvent("message", WorkerService.getSelf())
|> Most.filter((e) => e##data##operateType === "SEND_JOB_DATA" |> Js.Boolean.to_js_boolean)
|> Most.concatMap(
     (e) =>
       {
         _createAndSetWorkerState();
         WorkerJobMainService.getRenderWorkerJobStreamArr(
           e##data##pipelineJobs |> Js.Json.parseExn |> Obj.magic,
           e##data##jobs |> Js.Json.parseExn |> Obj.magic,
           (
             WorkerJobHandleSystem.createWorkerJobHandleMap,
             WorkerJobHandleSystem.getWorkerJobHandle
           ),
           StateDataRenderWorker.renderWorkerStateData
         )
       }
       |> Most.mergeArray
   )
|> Most.drain;