open StateDataMainType;

let create =
  (. state) => {
    let (pointLightRecord, index) =
      CreatePointLightService.create(.
        RecordPointLightMainService.getRecord(state),
      );
    state.pointLightRecord = Some(pointLightRecord);
    (state, index);
  };