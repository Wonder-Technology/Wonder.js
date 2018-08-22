open StateDataMainType;

open LightMaterialType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray} =
    RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.init(
    DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordLightMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord,
      ),
      JudgeInstanceMainService.isSupportInstance(state),
    ),
    CreateInitLightMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray),
      state,
    ),
  )
  |> ignore;
  state;
};