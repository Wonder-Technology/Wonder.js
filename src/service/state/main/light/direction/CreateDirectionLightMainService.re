open StateDataMainType;

let create =
  (. state) => {
    let (directionLightRecord, index) =
      CreateDirectionLightService.create(. state.directionLightRecord);
    state.directionLightRecord = directionLightRecord;
    (state, index);
  };