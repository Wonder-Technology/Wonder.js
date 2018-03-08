open StateDataType;

let execJob = (flags, elapsed, {perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    PerspectiveCameraProjectionUpdateService.update(perspectiveCameraProjectionRecord)
};