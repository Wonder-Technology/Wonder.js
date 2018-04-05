open StateDataMainType;

let execJob = (_, {perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    InitPerspectiveCameraProjectionService.init(perspectiveCameraProjectionRecord)
};