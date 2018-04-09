open StateDataMainType;

let execJob = (flags, {perspectiveCameraProjectionRecord} as state) => {
  ...state,
  perspectiveCameraProjectionRecord:
    UpdatePerspectiveCameraProjectionService.update(perspectiveCameraProjectionRecord)
};