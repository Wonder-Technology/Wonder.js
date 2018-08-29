open StateDataMainType;

let create =
  (. {perspectiveCameraProjectionRecord} as state) => {
    let (perspectiveCameraProjectionRecord, index) =
      CreatePerspectiveCameraProjectionService.create(
        state.perspectiveCameraProjectionRecord,
      );
    state.perspectiveCameraProjectionRecord = perspectiveCameraProjectionRecord;
    (state, index);
  };