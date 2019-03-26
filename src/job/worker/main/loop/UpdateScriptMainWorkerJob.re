open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    state
    |> UpdateScriptJobUtils.exec
    |> StateDataMainService.setState(stateData);

    None;
  });