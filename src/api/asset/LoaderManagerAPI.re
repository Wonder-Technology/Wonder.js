let _fetch = filePath => Fetch.fetch(filePath);

let loadConfig = jsonPathArr =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    _fetch,
    StateDataMain.stateData,
  );

let loadWholeWDB = (wdbPath, state) =>
  LoaderManagerSystem.loadWholeWDB(wdbPath, _fetch, state);

let loadStreamWDB =
    (
      wdbPath,
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
      handleWhenLoadWholeWDBFunc,
      state,
    ) =>
  LoaderManagerSystem.loadStreamWDB(
    wdbPath,
    (
      _fetch,
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
      handleWhenLoadWholeWDBFunc,
    ),
    state,
  );

let loadIMGUIAsset =
    (
      fntFilePath,
      bitmapFilePath,
      customTextureSourceDataArr,
      handleWhenLoadingFunc,
      state,
    ) =>
  LoaderManagerSystem.loadIMGUIAsset(
    (fntFilePath, bitmapFilePath),
    customTextureSourceDataArr,
    (_fetch, handleWhenLoadingFunc),
    state,
  );