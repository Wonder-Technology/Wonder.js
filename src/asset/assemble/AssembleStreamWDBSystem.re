open WDType;

let assemble = (({buffers}: wd) as wd, default11Image, state) => {
  let state =
    !OptionService.isJsonSerializedValueNone(wd.scene.imgui) ?
      state |> SetIMGUIFuncSystem.setIMGUIFunc(wd) : state;

  let (
    state,
    gameObjectArr,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (
      images,
      (basicSourceTextureArr, imageBasicSourceTextureIndices),
      (cubemapTextureArr, imageCubemapTextureIndices),
    ),
  ) =
    state
    |> BatchCreateSystem.batchCreate(true, wd)
    |> BatchOperateStreamSystem.batchOperate(wd, default11Image);

  let state = SetSkyboxSystem.setSkybox(wd, cubemapTextureArr, state);

  let (state, rootGameObject) =
    (state, gameObjectArr) |> BuildRootGameObjectSystem.build(wd);

  (
    state,
    rootGameObject,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (
      images,
      (basicSourceTextureArr, imageBasicSourceTextureIndices),
      (cubemapTextureArr, imageCubemapTextureIndices),
    ),
  );
};