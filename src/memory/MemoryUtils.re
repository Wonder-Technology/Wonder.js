let isDisposed = (key, disposedMap) => disposedMap |> WonderCommonlib.SparseMapSystem.has(key);

let isDisposeTooMany = (disposeCount: int, state: StateDataType.state) =>
  disposeCount >= MemoryConfigSystem.getMaxDisposeCount(state);