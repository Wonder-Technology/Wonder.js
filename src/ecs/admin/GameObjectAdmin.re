open GameObjectType;

open ComponentType;

/* let init = (state: StateDataType.state) =>
   state |> BasicCameraViewSystem.init |> GeometrySystem.init; */
/* let update = (elapsed: float, state: StateDataType.state) =>
   state |> BasicCameraViewSystem.update; */
let hasSourceInstanceComponent = GameObjectHasComponentCommon.hasSourceInstanceComponent;

let getSourceInstanceComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getSourceInstanceComponent(uid, state);

let addSourceInstanceComponent = GameObjectAddComponentCommon.addSourceInstanceComponent;

let disposeSourceInstanceComponent =
    (uid: int, component: component, batchDisposeGameObjectFunc, state: StateDataType.state) =>
  [@bs]
  GameObjectDisposeComponentCommon.disposeSourceInstanceComponent(
    uid,
    component,
    batchDisposeGameObjectFunc,
    state
  );

let hasObjectInstanceComponent = GameObjectHasComponentCommon.hasObjectInstanceComponent;

let getObjectInstanceComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getObjectInstanceComponent(uid, state);

let addObjectInstanceComponent = GameObjectAddComponentCommon.addObjectInstanceComponent;

let disposeObjectInstanceComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeObjectInstanceComponent(uid, component, state);

let hasAmbientLightComponent = GameObjectHasComponentCommon.hasAmbientLightComponent;

let getAmbientLightComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getAmbientLightComponent(uid, state);

let unsafeGetAmbientLightComponent = GameObjectGetComponentCommon.unsafeGetAmbientLightComponent;

let addAmbientLightComponent = GameObjectAddComponentCommon.addAmbientLightComponent;

let disposeAmbientLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeAmbientLightComponent(uid, component, state);

let hasDirectionLightComponent = GameObjectHasComponentCommon.hasDirectionLightComponent;

let getDirectionLightComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getDirectionLightComponent(uid, state);

let unsafeGetDirectionLightComponent = GameObjectGetComponentCommon.unsafeGetDirectionLightComponent;

let addDirectionLightComponent = GameObjectAddComponentCommon.addDirectionLightComponent;

let disposeDirectionLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeDirectionLightComponent(uid, component, state);

let hasPointLightComponent = GameObjectHasComponentCommon.hasPointLightComponent;

let getPointLightComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getPointLightComponent(uid, state);

let unsafeGetPointLightComponent = GameObjectGetComponentCommon.unsafeGetPointLightComponent;

let addPointLightComponent = GameObjectAddComponentCommon.addPointLightComponent;

let disposePointLightComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposePointLightComponent(uid, component, state);

let rec batchDispose = GameObjectDisposeCommon.batchDispose;

let dispose = GameObjectDisposeCommon.dispose;

let clone = GameObjectCloneCommon.clone;

/* TODO remove */
let isAlive = (uid: int, state: StateDataType.state) => {
  let {transformMap, disposedUidMap} = state.gameObjectRecord;
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: int, state: StateDataType.state) => {
  let state =
    switch (
      [@bs] GetComponentGameObjectService.getBoxGeometryComponent(uid, state.gameObjectRecord)
    ) {
    | Some(geometry) => InitGeometryService.handleInitComponent(geometry, state)
    | None => state
    };
  let state =
    switch (
      [@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, state.gameObjectRecord)
    ) {
    | Some(material) =>
      InitBasicMaterialService.handleInitComponent(
        [@bs] DeviceManagerSystem.unsafeGetGl(state),
        material,
        state
      )
    | None => state
    };
  let state =
    switch (
      [@bs] GetComponentGameObjectService.getLightMaterialComponent(uid, state.gameObjectRecord)
    ) {
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
/* let deepCopyForRestore = GameObjectStateCommon.deepCopyForRestore; */