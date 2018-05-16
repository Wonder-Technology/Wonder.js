open StateDataMainType;

let initGameObject = (uid: int, {gameObjectRecord} as state) => {
  let state =
    switch ([@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      let state = InitBasicMaterialMainService.handleInitComponent(material, state);
      InitTextureMainService.initTexture(
        OperateBasicMaterialMainService.getMap(material, state),
        state
      )
    | None => state
    };
  let state =
    switch ([@bs] GetComponentGameObjectService.getLightMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      let state = state |> InitLightMaterialMainService.handleInitComponent(material);
      let state =
        state
        |> InitTextureMainService.initTexture(
             OperateLightMaterialMainService.getDiffuseMap(material, state)
           );
      state
      |> InitTextureMainService.initTexture(
           OperateLightMaterialMainService.getSpecularMap(material, state)
         )
    | None => state
    };
  state
};