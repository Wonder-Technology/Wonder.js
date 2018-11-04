open StateDataMainType;

let create = (isRenderLight, state) => {
  let (pointLightRecord, index) =
    CreatePointLightService.create(
      isRenderLight,
      RecordPointLightMainService.getRecord(state),
    );
  state.pointLightRecord = Some(pointLightRecord);
  (state, index);
};