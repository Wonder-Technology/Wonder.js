open StateDataMainType;

let _workerInit = (stateData, state: StateDataMainType.state) =>
  WorkerJobMainService.getMainInitJobStream(
    stateData,
    (
      WorkerJobHandleSystem.createMainInitJobHandleMap,
      WorkerJobHandleSystem.getMainInitJobHandle,
    ),
    state,
  );

let _noWorkerInit = (state: StateDataMainType.state) =>
  state |> NoWorkerJobMainService.execNoWorkerInitJobs;

let initDirector = _noWorkerInit;

let _computeElapseTime = (time, state) => {
  state.timeControllerRecord =
    state.timeControllerRecord
    |> TimeControllerService.computeElapseTime(time);
  state;
};

/* TODO unit test */
let rec _createWorkerLoopStream = () =>
  MostAnimationFrame.nextAnimationFrame()
  |> Most.flatMap(time => {
       /* WonderLog.Log.log({j|time: $time|j}); */
       let state =
         _computeElapseTime(
           time,
           StateDataMainService.unsafeGetState(StateDataMain.stateData),
         );
       WorkerJobMainService.getMainLoopJobStream(
         StateDataMain.stateData,
         (
           WorkerJobHandleSystem.createMainLoopJobHandleMap,
           WorkerJobHandleSystem.getMainLoopJobHandle,
         ),
         state,
       )
       |> Most.map(e => ());
     })
  |> Most.continueWith(() => _createWorkerLoopStream());

let _run = (time: float, state: StateDataMainType.state) =>
  _computeElapseTime(time, state)
  |> NoWorkerJobMainService.execNoWorkerLoopJobs;

let loopBody = (time: float, state: StateDataMainType.state) =>
  state |> _run(time);

let rec _noWorkerLoop = (time: float, state: StateDataMainType.state) : int => {
  StateDataMainService.setState(StateDataMain.stateData, state) |> ignore;

  DomExtend.requestAnimationFrame((time: float) =>
    StateDataMainService.unsafeGetState(StateDataMain.stateData)
    |> loopBody(time)
    |> StateDataMainService.setState(StateDataMain.stateData)
    |> _noWorkerLoop(time)
    |> ignore
  );
};

/*
  TODO save loop id
  state |> init(StateDataMain.stateData) |> _loop(0.) |> ignore

 */
let startDirector = (state: StateDataMainType.state) =>
  /*
    TODO save loop id
    let rec _loop = (time: float, state: StateDataMainType.state) : int =>
      DomExtend.requestAnimationFrame(
        (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
    state |> init(StateDataMain.stateData) |> _loop(0.) |> ignore

   */
  /* state |> init(StateDataMain.stateData) |> ignore; */
  WorkerDetectMainService.isUseWorker(state) ?
    state
    |> StateDataMainService.setState(StateDataMain.stateData)
    |> _workerInit(StateDataMain.stateData)
    |> Most.concat(_createWorkerLoopStream())
    |> Most.drain
    |> ignore :
    state |> _noWorkerInit |> _noWorkerLoop(0.) |> ignore;