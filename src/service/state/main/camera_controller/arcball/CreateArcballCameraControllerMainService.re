open StateDataMainType;

let create =
  (. {arcballCameraControllerRecord} as state) => {
    let (arcballCameraControllerRecord, index) =
      CreateArcballCameraControllerService.create(
        state.arcballCameraControllerRecord,
      );

    state.arcballCameraControllerRecord = arcballCameraControllerRecord;

    (state, index);
  };