open StateDataMainType;

let execJob = (flags, elapsed, {perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    UpdatePerspectiveCameraProjectionService.update(perspectiveCameraProjectionRecord)
};