open StateDataMainType;

let create =
  (. {basicCameraViewRecord} as state) => {
    let (basicCameraViewRecord, index) =
      CreateBasicCameraViewService.create(state.basicCameraViewRecord);
    state.basicCameraViewRecord = basicCameraViewRecord;
    (state, index);
  };