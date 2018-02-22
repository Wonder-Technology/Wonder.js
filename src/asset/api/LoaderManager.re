let _fetch = [@bs] ((filePath) => Fetch.fetch(filePath));

let load = (dataDir: string, state: StateDataType.state) =>
  LoaderManagerSystem.load(dataDir, _fetch, StateData.stateData, state);