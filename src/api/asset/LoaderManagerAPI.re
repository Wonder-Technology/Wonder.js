let _fetch = (filePath) => Fetch.fetch(filePath);

let load = jsonPathArr =>
  LoaderManagerSystem.load(jsonPathArr, _fetch, StateDataMain.stateData);

let loadToData = (jsonPathArr, stateData) =>
  LoaderManagerSystem.load(jsonPathArr, _fetch, stateData);

let loadWDB = wdPath =>
  LoaderManagerSystem.loadWDB(wdPath, _fetch, StateDataMain.stateData);