open StateDataMainType;

let create =
  (. state) => {
    let (directionLightRecord, index) =
      CreateDirectionLightService.create(.
        RecordDirectionLightMainService.getRecord(state),
      );
    state.directionLightRecord = Some(directionLightRecord);
    (state, index);
  };