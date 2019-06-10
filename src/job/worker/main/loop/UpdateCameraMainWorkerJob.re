open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateDataMainService.unsafeGetState(stateData);

    let state =
      state
      |> UpdatePerspectiveCameraProjectionMainService.update
      |> UpdateArcballCameraControllerMainService.update
      |> UpdateFlyCameraControllerMainService.updateAll;

    StateDataMainService.setState(stateData, state);

    None;
  });