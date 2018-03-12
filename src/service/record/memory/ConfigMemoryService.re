open MemoryType;

let getMaxDisposeCount = (memoryConfig) => memoryConfig.maxDisposeCount;

let getMaxTypeArrayPoolSize = (memoryConfig) => memoryConfig.maxTypeArrayPoolSize;

let getMaxBigTypeArrayPoolSize = (memoryConfig) => memoryConfig.maxBigTypeArrayPoolSize;

/* TODO setMainConfig should set theses config */
let create = () => {
  maxDisposeCount: 1000,
  maxTypeArrayPoolSize: 5000,
  maxBigTypeArrayPoolSize: 100
};