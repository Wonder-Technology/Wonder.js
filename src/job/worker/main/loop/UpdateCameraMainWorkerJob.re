open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(() => {
    let {perspectiveCameraProjectionRecord} as state =
      StateDataMainService.unsafeGetState(stateData);
    let state = UpdatePerspectiveCameraProjectionMainService.update(state);
    StateDataMainService.setState(stateData, state);
    None;
  });