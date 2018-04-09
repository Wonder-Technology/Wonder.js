let _workerInit = (stateData, state: StateDataMainType.state) =>
  WorkerJobService.getMainInitJobStream(stateData, state);

let _noWorkerInit = (state: StateDataMainType.state) =>
  state |> NoWorkerJobService.execNoWorkerInitJobs;

let init = _noWorkerInit;

/* TODO unit test */
let rec _createWorkerLoopStream = () =>
  MostAnimationFrame.nextAnimationFrame()
  |> Most.flatMap(
       (time) => {
         WonderLog.Log.log({j|time: $time|j});
         WorkerJobService.getMainLoopJobStream(
           StateDataMain.stateData,
           StateDataMainService.unsafeGetState(StateDataMain.stateData)
         )
         |> Most.map((e) => ())
         /* Most.mergeArray([|
              MostUtils.callFunc(
                () => {
                  let state = StateDataMainService.unsafeGetState(StateDataMain.stateData);
                  WorkerInstanceService.unsafeGetRenderWorker(state.workerInstanceRecord)
                  |> WorkerService.postMessage({"operateType": "loop"})
                }
              ),
              MostUtils.fromWorkerEvent(
                "message",
                StateDataMainService.unsafeGetState(StateDataMain.stateData).workerInstanceRecord
                |> WorkerInstanceService.unsafeGetRenderWorker
              )
              |> Most.filter(
                   (e) => e##data##operateType === "finish_loop" |> Js.Boolean.to_js_boolean
                 )
              |> Most.take(1)
              |> Most.map((e) => ())
              |> Most.tap(
                   (e) =>
                     WonderLog.Log.log(
                       {j|**in main worker** get message from other worker: finish_loop|j}
                     )
                 )
            |]) */
       }
     )
  |> Most.continueWith(() => _createWorkerLoopStream());

let _run = (time: float, state: StateDataMainType.state) =>
  {
    ...state,
    timeControllerRecord:
      state.timeControllerRecord |> TimeControllerService.computeElapseTime(time)
  }
  |> NoWorkerJobService.execNoWorkerLoopJobs;

let loopBody = (time: float, state: StateDataMainType.state) => state |> _run(time);

let rec _noWorkerLoop = (time: float, state: StateDataMainType.state) : int =>
  Dom.requestAnimationFrame(
    (time: float) =>
      state
      |> loopBody(time)
      |> StateDataMainService.setState(StateDataMain.stateData)
      |> _noWorkerLoop(time)
      |> ignore
  );

/*
  TODO save loop id
  state |> init(StateDataMain.stateData) |> _loop(0.) |> ignore

 */
let start = (state: StateDataMainType.state) =>
  /*
    TODO save loop id
    let rec _loop = (time: float, state: StateDataMainType.state) : int =>
      Dom.requestAnimationFrame(
        (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
    state |> init(StateDataMain.stateData) |> _loop(0.) |> ignore

   */
  /* state |> init(StateDataMain.stateData) |> ignore; */
  WorkerDetectMainService.isUseWorker(state) ?
    {
      state
      |> StateDataMainService.setState(StateDataMain.stateData)
      |> _workerInit(StateDataMain.stateData)
      |> Most.concat(_createWorkerLoopStream())
      |> Most.drain
      |> ignore
    } :
    state |> _noWorkerInit |> _noWorkerLoop(0.) |> ignore;