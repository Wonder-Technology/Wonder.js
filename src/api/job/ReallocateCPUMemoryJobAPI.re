open StateDataMainType;

let reallocateGameObjectByDisposeCount = ReallocateCPUMemoryJobUtils.reallocateGameObjectByDisposeCount;

let isDisposeTooMany = state =>
  QueryCPUMemoryService.isDisposeTooMany(
    RecordGeometryMainService.getRecord(state).disposeCount,
    state.settingRecord,
  );

let isGeometryBufferNearlyFull = (percent, state) =>
  QueryCPUMemoryService.isGeometryBufferNearlyFull(
    percent,
    RecordGeometryMainService.getRecord(state),
  );

let reAllocateToBuffer = (newBufferData, state) => {
  ...state,
  geometryRecord:
    ReallocateGeometryCPUMemoryService.reAllocateToBuffer(
      newBufferData,
      RecordGeometryMainService.getRecord(state),
    )
    ->Some,
};

let initGeometryBufferData = ({settingRecord}) => {
  let geometryPointCount =
    BufferSettingService.getGeometryPointCount(settingRecord);
  let geometryCount = BufferSettingService.getGeometryCount(settingRecord);

  RecordGeometryMainService._initBufferData(
    geometryPointCount,
    geometryCount,
  );
};

let reallocateGeometry = (percent, state) =>
  ReallocateCPUMemoryJobUtils.reallocateGeometry(percent, state);

let resetDisposeCount = state => {
  ...state,
  geometryRecord:
    Some({...RecordGeometryMainService.getRecord(state), disposeCount: 0}),
};