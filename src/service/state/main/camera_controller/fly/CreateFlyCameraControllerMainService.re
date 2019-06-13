open StateDataMainType;

let create =
  (. {flyCameraControllerRecord} as state) => {
    let (flyCameraControllerRecord, index) =
      CreateFlyCameraControllerService.create(
        state.flyCameraControllerRecord,
      );
    state.flyCameraControllerRecord = flyCameraControllerRecord;
    (state, index);
  };