let _fetch = filePath => Fetch.fetch(filePath);

let loadConfig = jsonPathArr =>
  LoaderManagerSystem.loadConfig(
    jsonPathArr,
    _fetch,
    StateDataMain.stateData,
  );

let loadWholeWDB =
    (
      wdbPath,
      isSetIMGUIFunc,
      isBindEvent,
      isActiveCamera,
      handleWhenLoadingFunc,
      state,
    ) =>
  LoaderManagerSystem.loadWholeWDB(
    wdbPath,
    (isSetIMGUIFunc, isBindEvent, isActiveCamera),
    (_fetch, handleWhenLoadingFunc),
    state,
  );

let loadStreamWDB =
    (
      wdbPath,
      handleWhenLoadingFunc,
      handleBeforeStartLoopFunc,
      handleWhenDoneFunc,
      handleWhenLoadWholeWDBFunc,
      state,
    ) =>
  LoaderManagerSystem.loadStreamWDB(
    wdbPath,
    (
      _fetch,
      handleWhenLoadingFunc,
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