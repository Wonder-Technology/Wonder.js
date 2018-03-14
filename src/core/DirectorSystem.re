let _workerInit = (stateData, state: MainStateDataType.state) =>
  WorkerJobService.getMainInitJobStream(stateData, state);

let _noWorkerInit = (state: MainStateDataType.state) =>
  state |> NoWorkerJobService.execNoWorkerInitJobs;

let init = _noWorkerInit;

/* TODO unit test */
let rec _createWorkerLoopStream = () =>
  MostAnimationFrame.nextAnimationFrame()
  |> Most.flatMap(
       (time) => {
         WonderLog.Log.log({j|time: $time|j});
         Most.mergeArray([|
           MostUtils.callFunc(
             () => {
               let state = StateDataMainService.getState(MainStateData.stateData);
               WorkerInstanceSystem.unsafeGetRenderWorker(state)
               |> WorkerUtils.postMessage({"operateType": "loop"})
             }
           ),
           MostUtils.fromWorkerEvent(
             "message",
             StateDataMainService.getState(MainStateData.stateData)
             |> WorkerInstanceSystem.unsafeGetRenderWorker
           )
           |> Most.filter(
                (e) => e##record##operateType === "finish_loop" |> Js.Boolean.to_js_boolean
              )
           |> Most.take(1)
           |> Most.map((e) => ())
           |> Most.tap(
                (e) =>
                  WonderLog.Log.log(
                    {j|**in main worker** get message from other worker: finish_loop|j}
                  )
              )
         |])
       }
     )
  |> Most.continueWith(() => _createWorkerLoopStream());

let _run = (time: float, state: MainStateDataType.state) =>
  {
    ...state,
    timeControllerRecord:
      state.timeControllerRecord |> TimeControllerService.computeElapseTime(time)
  }
  |> NoWorkerJobService.execNoWorkerLoopJobs;

let loopBody = (time: float, state: MainStateDataType.state) => state |> _run(time);

let rec _noWorkerLoop = (time: float, state: MainStateDataType.state) : int =>
  Dom.requestAnimationFrame(
    (time: float) =>
      state
      |> loopBody(time)
      |> StateDataMainService.setState(MainStateData.stateData)
      |> _noWorkerLoop(time)
      |> ignore
  );

/*
  TODO save loop id
  state |> init(MainStateData.stateData) |> _loop(0.) |> ignore

 */
let start = (state: MainStateDataType.state) =>
  /*
    TODO save loop id
    let rec _loop = (time: float, state: MainStateDataType.state) : int =>
      Dom.requestAnimationFrame(
        (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
    state |> init(MainStateData.stateData) |> _loop(0.) |> ignore

   */
  /* state |> init(MainStateData.stateData) |> ignore; */
  WorkerDetectMainService.isUseWorker(state) ?
    state
    |> StateDataMainService.setState(MainStateData.stateData)
    |> _workerInit(MainStateData.stateData)
    |> Most.concat(_createWorkerLoopStream())
    |> Most.drain
    |> ignore :
    state |> _noWorkerInit |> _noWorkerLoop(0.) |> ignore;