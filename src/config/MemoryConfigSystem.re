open MemoryConfigType;

let getConfig = (state: StateDataType.state) => state.memoryConfig;

/* todo add setMainConfig inject MemoryConfig.maxDisposeCount? */
let initData = () => {maxDisposeCount: 1000};