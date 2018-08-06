open StateDataMainType;

open GameObjectType;

open GeometryType;

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

let _reallocateGeometryByDisposeCount = ({settingRecord} as state) => {
  ...state,
  geometryRecord:
    Some(
      {
        let geometryRecord = RecordGeometryMainService.getRecord(state);
        if (QueryCPUMemoryService.isDisposeTooMany(
              geometryRecord.disposeCount,
              settingRecord
            )) {
          geometryRecord.disposeCount = 0;
          ReallocateGeometryCPUMemoryService.reAllocate(geometryRecord)
        } else {
          geometryRecord
        }
      }
    )
};

let execJob = (state) =>
  state |> _reallocateGameObjectByDisposeCount |> _reallocateGeometryByDisposeCount;