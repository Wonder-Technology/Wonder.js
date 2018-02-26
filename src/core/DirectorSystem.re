open StateSystem;

let _workerInit = (stateData, state: StateDataType.state) =>
  WorkerJobSystem.getMainInitJobStream(stateData, state);

let _noWorkerInit = (state: StateDataType.state) =>
  state |> NoWorkerJobSystem.execNoWorkerInitJobs;

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
               let state = StateSystem.getState(StateData.stateData);
               WorkerInstanceSystem.unsafeGetRenderWorker(state)
               |> WorkerUtils.postMessage({"operateType": "loop"})
             }
           ),
           MostUtils.fromWorkerEvent(
             "message",
             StateSystem.getState(StateData.stateData)
             |> WorkerInstanceSystem.unsafeGetRenderWorker
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
         |])
       }
     )
  |> Most.continueWith(() => _createWorkerLoopStream());

let _run = (time: float, state: StateDataType.state) =>
  state
  |> NoWorkerJobSystem.execNoWorkerLoopJobs(TimeControllerSystem.computeElapseTime(time, state));

let _loopBody = (time: float, state: StateDataType.state) => state |> _run(time);

let rec _noWorkerLoop = (time: float, state: StateDataType.state) : int =>
  Dom.requestAnimationFrame(
    (time: float) =>
      state |> _loopBody(time) |> setState(StateData.stateData) |> _noWorkerLoop(time) |> ignore
  );

/*
  TODO save loop id
  state |> init(StateData.stateData) |> _loop(0.) |> ignore

 */
let start = (state: StateDataType.state) =>
  /*
    TODO save loop id
    let rec _loop = (time: float, state: StateDataType.state) : int =>
      Dom.requestAnimationFrame(
        (time: float) => state |> loopBody(time) |> setState(stateData) |> _loop(time) |> ignore
      );
    state |> init(StateData.stateData) |> _loop(0.) |> ignore

   */
  /* state |> init(StateData.stateData) |> ignore; */
  WorkerDetectSystem.isUseWorker(state) ?
    state
    |> StateSystem.setState(StateData.stateData)
    |> _workerInit(StateData.stateData)
    |> Most.concat(_createWorkerLoopStream())
    |> Most.drain
    |> ignore :
    state |> _noWorkerInit |> _noWorkerLoop(0.) |> ignore;