let _fetch = [@bs] ((filePath) => Fetch.fetch(filePath));

let load = (dataDir: string) =>
  LoaderManagerSystem.load(dataDir, _fetch, StateData.stateData);