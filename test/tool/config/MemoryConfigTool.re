open ConfigMemoryService;

let setConfig = (state: StateDataType.state, ~maxDisposeCount=1000, ()) => {
  state.memoryConfig.maxDisposeCount = maxDisposeCount;
  state
};