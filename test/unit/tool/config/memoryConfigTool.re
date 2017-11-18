open MemoryConfigSystem;

let setConfig = (state: StateDataType.state, ~maxDisposeCount=1000, ()) => {
  getConfig(state).maxDisposeCount = maxDisposeCount;
  state
};