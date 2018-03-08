open MemoryConfigType;

let getConfig = (state: StateDataType.state) => state.memoryConfig;

let getMaxDisposeCount = (state: StateDataType.state) => state.memoryConfig.maxDisposeCount;

let getMaxTypeArrayPoolSize = (state: StateDataType.state) =>
  state.memoryConfig.maxTypeArrayPoolSize;

let getMaxBigTypeArrayPoolSize = (state: StateDataType.state) =>
  state.memoryConfig.maxBigTypeArrayPoolSize;

/* TODO setMainConfig should set theses config */
let create = () => {
  maxDisposeCount: 1000,
  maxTypeArrayPoolSize: 5000,
  maxBigTypeArrayPoolSize: 100
};