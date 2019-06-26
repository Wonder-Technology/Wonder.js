open StateDataMainType;

open LightMaterialType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray} =
    RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.init(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordLightMaterialMainService.getRecord(state).gameObjectsMap,
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