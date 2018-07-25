open StateDataMainType;

let _exec = (data, state) =>
  OperateWorkerDataMainService.setRenderWorkerCustomData(
    data##customData,
    state,
  )
  |> RecordIMGUIMainService.setControlDataFromRenderWorker(data##imguiData);

let execJob = (flags, stateData) =>
  GetWorkerDataJobUtils.createGetOtherWorkerDataStream(flags, stateData)
  |> WonderBsMost.Most.tap(e => {
       let state = StateDataMainService.unsafeGetState(stateData);
       let data = e##data;

       let state = _exec(data, state);

       StateDataMainService.setState(stateData, state) |> ignore;

       ();
     })
  |> WonderBsMost.Most.map(e => None);