let isDisposed = (key, disposedMap) => disposedMap |> HashMapSystem.has(key);


let isDisposeTooMany = (disposeCount: int, state: StateDataType.state) =>
  disposeCount >= state.memoryConfig.maxDisposeCount;