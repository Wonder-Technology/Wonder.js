open StateDataMainType;

open GameObjectType;

open GeometryType;

let reallocateGameObjectByDisposeCount =
    ({settingRecord, gameObjectRecord} as state) =>
  if (QueryCPUMemoryService.isDisposeTooMany(
        gameObjectRecord.disposeCount,
        state.settingRecord,
      )) {
    gameObjectRecord.disposeCount = 0;
    {
      ...state,
      gameObjectRecord:
        ReallocateGameObjectCPUMemoryService.reAllocate(
          state.gameObjectRecord,
        ),
    };
  } else {
    state;
  };

let reallocateGeometry = (percent, {settingRecord} as state) => {
  ...state,
  geometryRecord:
    Some(
      {
        let geometryRecord = RecordGeometryMainService.getRecord(state);

        if (QueryCPUMemoryService.isDisposeTooMany(
              geometryRecord.disposeCount,
              settingRecord,
            )
            || QueryCPUMemoryService.isGeometryBufferNearlyFull(
                 percent,
                 geometryRecord,
               )) {
          geometryRecord.disposeCount = 0;
          ReallocateGeometryCPUMemoryService.reAllocateToTheSameBuffer(
            geometryRecord,
          );
        } else {
          geometryRecord;
        };
      },
    ),
};

let execJob = state =>
  state |> reallocateGameObjectByDisposeCount |> reallocateGeometry(0.9);