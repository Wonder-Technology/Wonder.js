open StateDataMainType;

open BasicMaterialType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  InitBasicMaterialInitMaterialService.init(
    [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
    (
      JudgeInstanceMainService.buildMap(
        basicMaterialRecord.index,
        RecordBasicMaterialMainService.getRecord(state).gameObjectMap,
        gameObjectRecord
      ),
      JudgeInstanceMainService.isSupportInstance(state)
    ),
    CreateInitMaterialStateMainService.createInitMaterialState(state)
  )
  |> ignore;
  state
};