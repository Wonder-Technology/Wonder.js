open WDType;

let assemble = (({buffers}: wd) as wd, default11Image, state) => {
  let (
    state,
    gameObjectArr,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (basicSourceTextureArr, imageTextureIndices, images),
  ) =
    state
    |> SetIMGUIFuncSystem.setIMGUIFunc(wd)
    |> BatchCreateSystem.batchCreate(wd)
    |> BatchOperateStreamSystem.batchOperate(wd, default11Image);

  let (state, rootGameObject) =
    (state, gameObjectArr) |> BuildRootGameObjectSystem.build(wd);

  (
    state,
    rootGameObject,
    (geometryArr, geometryGameObjects, gameObjectGeometrys),
    (basicSourceTextureArr, imageTextureIndices, images),
  );
};