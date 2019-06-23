open StateDataMainType;

let execJob = (_, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    state
    |> InitSkyboxJobUtils.exec
    |> StateDataMainService.setState(stateData);

    None;
  });