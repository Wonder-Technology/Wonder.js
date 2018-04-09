open StateDataMainType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {perspectiveCameraProjectionRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      state.perspectiveCameraProjectionRecord =
        UpdatePerspectiveCameraProjectionService.update(perspectiveCameraProjectionRecord);
      None
    }
  );