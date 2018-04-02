open MainStateDataType;

open MainStateDataType;

let initGameObject = (uid: int, {gameObjectRecord} as state) => {
  let boxGeometryType = CurrentComponentDataMapService.getBoxGeometryType();
  let state =
    switch ([@bs] GetComponentGameObjectService.getGeometryComponentData(uid, gameObjectRecord)) {
    | Some((component, type_)) =>
      switch type_ {
      | type_ when type_ === boxGeometryType =>
        InitBoxGeometryMainService.handleInitComponent(component, state)
      | _ => state
      }
    | None => state
    };
  let state =
    switch ([@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord)) {
    | Some(material) =>
      InitBasicMaterialMainService.handleInitComponent(
        [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
        material,
        state
      )
    | None => state
    };
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