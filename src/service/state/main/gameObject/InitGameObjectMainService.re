open StateDataMainType;

let _initMaterialComponent = (uid, {gameObjectRecord} as state) => {
  let state =
    switch (
      GetComponentGameObjectService.getBasicMaterialComponent(.
        uid,
        gameObjectRecord,
      )
    ) {
    | Some(material) =>
      let state =
        InitBasicMaterialMainService.handleInitComponent(material, state);
      InitSourceTextureMainService.initTexture(
        OperateBasicMaterialMainService.getMap(material, state),
        state,
      );
    | None => state
    };
  let state =
    switch (
      GetComponentGameObjectService.getLightMaterialComponent(.
        uid,
        gameObjectRecord,
      )
    ) {
    | Some(material) =>
      let state =
        state |> InitLightMaterialMainService.handleInitComponent(material);
      let state =
        state
        |> InitSourceTextureMainService.initTexture(
             OperateLightMaterialMainService.getDiffuseMap(material, state),
           );
      state
      |> InitSourceTextureMainService.initTexture(
           OperateLightMaterialMainService.getSpecularMap(material, state),
         );
    | None => state
    };

  state;
};

let initGameObject = (uid: int, {gameObjectRecord} as state) => {
  let state = state |> _initMaterialComponent(uid);

  let state =
    switch (
      GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(.
        uid,
        gameObjectRecord,
      )
    ) {
    | Some(cameraProjection) =>
      InitPerspectiveCameraProjectionMainService.initPerspepctiveCameraProjection(
        cameraProjection,
        state,
      )
    | None => state
    };

  state;
};