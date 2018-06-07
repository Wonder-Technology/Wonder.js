open StateDataMainType;

let execJob = (_, {perspectiveCameraProjectionRecord} as state) =>
  InitPerspectiveCameraProjectionMainService.init(state);