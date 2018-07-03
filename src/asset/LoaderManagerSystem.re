let load = (jsonPathArr, fetchFunc, stateData) =>
  ConfigDataLoaderSystem.load(jsonPathArr, fetchFunc, stateData);

let loadWDB = (wdPath, fetchFunc, stateData) =>
  LoadWDBSystem.load(wdPath, fetchFunc, stateData);