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
  state
  |> NoWorkerJobMainService.init((
       NoWorkerJobHandleSystem.createInitJobHandleMap,
       NoWorkerJobHandleSystem.createLoopJobHandleMap,
     ))
  |> NoWorkerJobMainService.execNoWorkerInitJobs;

let _computeElapseTime = (time, state) => {
  state.timeControllerRecord =
    state.timeControllerRecord
    |> TimeControllerService.computeElapseTime(time);
  state;
};

let rec _createWorkerLoopStream = () =>
  MostAnimationFrame.nextAnimationFrame()
  |> WonderBsMost.Most.flatMap(time => {
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
       |> WonderBsMost.Most.map(e => ());
     })
  |> WonderBsMost.Most.continueWith(() => _createWorkerLoopStream());

let _run = (time: float, state: StateDataMainType.state) =>
  _computeElapseTime(time, state)
  |> NoWorkerJobMainService.execNoWorkerLoopJobs;

let init = _noWorkerInit;

let loopBody = (time: float, state: StateDataMainType.state) =>
  state |> _run(time);

let rec _noWorkerLoop = (time: float): int =>
  DomExtend.requestAnimationFrame((time: float) => {
    StateDataMainService.unsafeGetState(StateDataMain.stateData)
    |> loopBody(time)
    |> StateDataMainService.setState(StateDataMain.stateData)
    |> ignore;

    _noWorkerLoop(time) |> ignore;
  });

let start = (state: StateDataMainType.state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    state
    |> StateDataMainService.setState(StateDataMain.stateData)
    |> _workerInit(StateDataMain.stateData)
    |> WonderBsMost.Most.concat(_createWorkerLoopStream())
    |> WonderBsMost.Most.drain
    |> ignore :
    {
      state
      |> _noWorkerInit
      |> StateDataMainService.setState(StateDataMain.stateData)
      |> ignore;

      _noWorkerLoop(0.) |> ignore;
    };