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
    | Some(material) => InitLightMaterialMainService.handleInitComponent(material, state)
    | None => state
    };
  state
};