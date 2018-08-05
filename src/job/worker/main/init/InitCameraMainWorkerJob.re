open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    let state = state |> InitPerspectiveCameraProjectionMainService.init;

    StateDataMainService.setState(stateData, state);
    None;
  });