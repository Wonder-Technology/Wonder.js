let _fetch = filePath => Fetch.fetch(filePath);

let loadConfig = jsonPathArr =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    _fetch,
    StateDataMain.stateData,
  );

let loadWDB = (wdbPath, state) =>
  LoaderManagerSystem.loadWDB(wdbPath, _fetch, state);

let loadStreamWDB = (wdbPath, handleBeforeStartLoopFunc, handleWhenDoneFunc, state) =>
  LoaderManagerSystem.loadStreamWDB(
    wdbPath,
    (_fetch, handleBeforeStartLoopFunc, handleWhenDoneFunc),
    state,
  );

let loadIMGUIAsset =
    (fntFilePath, bitmapFilePath, customTextureSourceDataArr, state) =>
  LoaderManagerSystem.loadIMGUIAsset(
    (fntFilePath, bitmapFilePath),
    customTextureSourceDataArr,
    _fetch,
    state,
  );