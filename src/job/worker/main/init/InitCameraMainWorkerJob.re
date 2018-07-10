open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    let state =
      state
      |> InitPerspectiveCameraProjectionMainService.init
      |> InitArcballCameraControllerMainService.init;

    StateDataMainService.setState(stateData, state);
    None;
  });