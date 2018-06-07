open StateDataMainType;

let execJob = (flags, {perspectiveCameraProjectionRecord} as state) =>
  UpdatePerspectiveCameraProjectionMainService.update(state);