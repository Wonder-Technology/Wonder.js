open ConfigMemoryService;

let setConfig = (state: MainStateDataType.state, ~maxDisposeCount=1000, ()) => {
  state.memoryConfig.maxDisposeCount = maxDisposeCount;
  state
};