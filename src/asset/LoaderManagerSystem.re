let loadConfig = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWDB = (wdPath, fetchFunc, state) =>
  LoadWDBSystem.load(wdPath, fetchFunc, state);