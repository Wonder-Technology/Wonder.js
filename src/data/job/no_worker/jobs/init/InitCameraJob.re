open StateDataType;

let execJob = (_, {perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    PerspectiveCameraProjectionInitService.init(perspectiveCameraProjectionRecord)
};