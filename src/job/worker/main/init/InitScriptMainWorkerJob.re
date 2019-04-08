open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    state
    |> InitScriptJobUtils.exec
    |> StateDataMainService.setState(stateData);

    None;
  });