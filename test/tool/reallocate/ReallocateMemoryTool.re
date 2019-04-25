open StateDataMainType;

let reallocateGeometryMemory = state => {
  open GeometryType;

  let geometryRecord = RecordGeometryMainService.getRecord(state);

  geometryRecord.disposeCount = 0;

  let geometryRecord =
    ReallocateGeometryCPUMemoryService.reAllocateToTheSameBuffer(
      geometryRecord,
    );

  {...state, geometryRecord: Some(geometryRecord)};
};

let reallocateGameObjectMemory = state => {
  ...state,
  gameObjectRecord:
    ReallocateGameObjectCPUMemoryService.reAllocate(state.gameObjectRecord),
};

let reallocateAll = state =>
  state |> reallocateGeometryMemory |> reallocateGameObjectMemory;