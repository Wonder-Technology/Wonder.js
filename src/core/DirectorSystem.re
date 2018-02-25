open StateSystem;

let init = (stateData, state: StateDataType.state) =>
  /* state
     |> LogicJobSystem.execLogicInitJobs
     |> RenderJobSystem.execRenderInitJobs([@bs] DeviceManagerSystem.unsafeGetGl(state)); */
  /* TODO handle single */
  WorkerJobSystem.getMainInitJobStream(stateData, state);

/*
 let _run = (time: float, state: StateDataType.state) => {
   let elapsed = TimeControllerSystem.computeElapseTime(time, state);
   state
   |> LogicJobSystem.execLogicUpdateJobs(elapsed)
   |> RenderJobSystem.execRenderRenderJobs([@bs] DeviceManagerSystem.unsafeGetGl(state))
 }; */
/* TODO unit test */
/* let loopBody = (time: float, state: StateDataType.state) => state |> _run(time); */
let rec _createLoopStream = () =>
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
  |> Most.continueWith(() => _createLoopStream());

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
  state
  |> StateSystem.setState(StateData.stateData)
  |> init(StateData.stateData)
  |> Most.concat(_createLoopStream())
  |> Most.drain
  |> ignore;