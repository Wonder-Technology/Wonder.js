open StateDataMainType;

let create = (isRenderLight, state) => {
  let (directionLightRecord, index) =
    CreateDirectionLightService.create(
      isRenderLight,
      RecordDirectionLightMainService.getRecord(state),
    );
  state.directionLightRecord = Some(directionLightRecord);
  (state, index);
};