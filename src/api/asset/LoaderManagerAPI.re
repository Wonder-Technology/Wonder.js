let _fetch = filePath => Fetch.fetch(filePath);

let loadConfig = jsonPathArr =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    _fetch,
    StateDataMain.stateData,
  );

let loadWDB = (wdPath, state) =>
  LoaderManagerSystem.loadWDB(wdPath, _fetch, state);

let loadIMGUIAsset =
    (fntFilePath, bitmapFilePath, customTextureSourceDataArr, state) =>
  LoaderManagerSystem.loadIMGUIAsset(
    (fntFilePath, bitmapFilePath),
    customTextureSourceDataArr,
    _fetch,
    state,
  );