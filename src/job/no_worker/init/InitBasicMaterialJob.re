open StateDataMainType;

open BasicMaterialType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let {index, disposedIndexArray} =
    RecordBasicMaterialMainService.getRecord(state);
  InitInitBasicMaterialService.init(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
    (
      JudgeInstanceMainService.buildMap(
        index,
        RecordBasicMaterialMainService.getRecord(state).gameObjectsMap,
        gameObjectRecord,
      ),
      JudgeInstanceMainService.isSupportInstance(state),
    ),
    CreateInitBasicMaterialStateMainService.createInitMaterialState(
      (index, disposedIndexArray),
      state,
    ),
  )
  |> ignore;
  state;
};