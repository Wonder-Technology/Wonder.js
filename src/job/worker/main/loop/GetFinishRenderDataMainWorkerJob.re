open StateDataMainType;

let _exec = (e, state) =>
  OperateWorkerDataMainService.setRenderWorkerCustomData(
    e##data##customData,
    state,
  );

let execJob = (flags, stateData) =>
  GetWorkerDataJobUtils.createGetOtherWorkerDataStream(flags, stateData)
  |> WonderBsMost.Most.tap(e => {
       let state = StateDataMainService.unsafeGetState(stateData);

       let state = _exec(e, state);

       StateDataMainService.setState(stateData, state) |> ignore;

       ();
     })
  |> WonderBsMost.Most.map(e => None);