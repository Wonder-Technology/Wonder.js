open StateDataMainType;

open StateDataMainType;

let initGameObject = (uid: int, {gameObjectRecord} as state) => {
  let state =
    switch ([@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) => InitBasicMaterialMainService.handleInitComponent(material, state)
    | None => state
    };
  /* TODO fix light material */
  let state =
    switch ([@bs] GetComponentGameObjectService.getLightMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      InitLightMaterialMainService.handleInitComponent(
        [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
        material,
        state
      )
    | None => state
    };
  state
};