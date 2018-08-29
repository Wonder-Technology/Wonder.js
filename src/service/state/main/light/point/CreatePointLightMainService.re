open StateDataMainType;

let create =
  (. state) => {
    let (pointLightRecord, index) =
      CreatePointLightService.create(. state.pointLightRecord);
    state.pointLightRecord = pointLightRecord;
    (state, index);
  };