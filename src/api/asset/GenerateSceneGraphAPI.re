let generateGLBData =
    (
      sceneGameObject,
      imageUint8ArrayMap,
      isBuildCubemapFromSceneSkybox,
      state,
    ) =>
  GenerateSceneGraphSystem.generateGLBData(
    sceneGameObject,
    switch (Js.toOption(imageUint8ArrayMap)) {
    | None => WonderCommonlib.MutableSparseMapService.createEmpty()
    | Some(imageUint8ArrayMap) => imageUint8ArrayMap
    },
    isBuildCubemapFromSceneSkybox,
    state,
  );

let generateWDB =
    (
      sceneGameObject,
      imageUint8ArrayMap,
      isBuildCubemapFromSceneSkybox,
      state,
    ) =>
  GenerateSceneGraphSystem.generateWDB(
    sceneGameObject,
    switch (Js.toOption(imageUint8ArrayMap)) {
    | None => WonderCommonlib.MutableSparseMapService.createEmpty()
    | Some(imageUint8ArrayMap) => imageUint8ArrayMap
    },
    isBuildCubemapFromSceneSkybox,
    state,
  );