open StateDataMainType;

open GameObjectType;

open CustomGeometryType;

let _reallocateGameObjectByDisposeCount = ({settingRecord, gameObjectRecord} as state) =>
  if (QueryCPUMemoryService.isDisposeTooMany(gameObjectRecord.disposeCount, state.settingRecord)) {
    gameObjectRecord.disposeCount = 0;
    {
      ...state,
      gameObjectRecord: ReallocateGameObjectCPUMemoryService.reAllocate(state.gameObjectRecord)
    }
  } else {
    state
  };

let _reallocateCustomGeometryByDisposeCount = ({settingRecord} as state) => {
  ...state,
  customGeometryRecord:
    Some(
      {
        let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
        if (QueryCPUMemoryService.isDisposeTooMany(
              customGeometryRecord.disposeCount,
              settingRecord
            )) {
          customGeometryRecord.disposeCount = 0;
          ReallocateCustomGeometryCPUMemoryService.reAllocate(customGeometryRecord)
        } else {
          customGeometryRecord
        }
      }
    )
};

let execJob = (state) =>
  state |> _reallocateGameObjectByDisposeCount |> _reallocateCustomGeometryByDisposeCount;