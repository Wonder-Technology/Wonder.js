open StateDataType;

open GameObjectType;

let initGameObject = (uid: int, {gameObjectRecord} as state) => {
  let state =
    switch ([@bs] GetComponentGameObjectService.getBoxGeometryComponent(uid, gameObjectRecord)) {
    | Some(geometry) => InitGeometryService.handleInitComponent(geometry, state)
    | None => state
    };
  let state =
    switch ([@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      InitBasicMaterialService.handleInitComponent(
        [@bs] DeviceManagerSystem.unsafeGetGl(state),
        material,
        state
      )
    | None => state
    };
  let state =
    switch ([@bs] GetComponentGameObjectService.getLightMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      InitLightMaterialService.handleInitComponent(
        [@bs] DeviceManagerSystem.unsafeGetGl(state),
        material,
        state
      )
    | None => state
    };
  state
};