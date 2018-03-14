open MainStateDataType;

let isDisposed = (key, disposedMap) => disposedMap |> WonderCommonlib.SparseMapSystem.has(key);

let isDisposeTooMany = (disposeCount: int, state: MainStateDataType.state) =>
  disposeCount >= MemorySettingService.getMaxDisposeCount(state.settingRecord);