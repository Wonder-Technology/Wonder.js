open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    InitEventJobUtils.initEvent(state)
    |> StateDataMainService.setState(stateData);

    None;
  });