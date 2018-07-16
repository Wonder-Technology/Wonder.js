let _fetch = (filePath) => Fetch.fetch(filePath);

let loadConfig = jsonPathArr =>
  LoaderManagerSystem.loadConfig(jsonPathArr, _fetch, StateDataMain.stateData);

let loadWDB = wdPath =>
  LoaderManagerSystem.loadWDB(wdPath, _fetch, StateDataMain.stateData);