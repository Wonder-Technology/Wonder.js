open GameObjectType;

open ComponentType;

/* let init = (state: StateDataType.state) =>
   state |> CameraControllerSystem.init |> GeometrySystem.init; */
let initDataFromState = (state: StateDataType.state) =>
  state |> TransformHelper.initData |> GeometryHelper.initData;

/* let update = (elapsed: float, state: StateDataType.state) =>
   state |> CameraControllerSystem.update; */
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

let hasCameraControllerComponent = GameObjectHasComponentCommon.hasCameraControllerComponent;

let getCameraControllerComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getCameraControllerComponent(uid, state);

let addCameraControllerComponent = GameObjectAddComponentCommon.addCameraControllerComponent;

let disposeCameraControllerComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeCameraControllerComponent(uid, component, state);

let hasTransformComponent = GameObjectHasComponentCommon.hasTransformComponent;

let getTransformComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getTransformComponent(uid, state);

let unsafeGetTransformComponent = GameObjectGetComponentCommon.unsafeGetTransformComponent;

let addTransformComponent = GameObjectAddComponentCommon.addTransformComponent;

let disposeTransformComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeTransformComponent(uid, component, state);

let hasGeometryComponent = GameObjectHasComponentCommon.hasGeometryComponent;

let getGeometryComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getGeometryComponent(uid, state);

let unsafeGetGeometryComponent = GameObjectGetComponentCommon.unsafeGetGeometryComponent;

let addGeometryComponent = GameObjectAddComponentCommon.addGeometryComponent;

let disposeGeometryComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeGeometryComponent(uid, component, state);

let hasMeshRendererComponent = GameObjectHasComponentCommon.hasMeshRendererComponent;

let getMeshRendererComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getMeshRendererComponent(uid, state);

let addMeshRendererComponent = GameObjectAddComponentCommon.addMeshRendererComponent;

let disposeMeshRendererComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeMeshRendererComponent(uid, component, state);

let hasBasicMaterialComponent = GameObjectHasComponentCommon.hasBasicMaterialComponent;

let getBasicMaterialComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getBasicMaterialComponent(uid, state);

let unsafeGetBasicMaterialComponent = GameObjectGetComponentCommon.unsafeGetBasicMaterialComponent;

let addBasicMaterialComponent = GameObjectAddComponentCommon.addBasicMaterialComponent;

let disposeBasicMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeBasicMaterialComponent(uid, component, state);

let hasLightMaterialComponent = GameObjectHasComponentCommon.hasLightMaterialComponent;

let getLightMaterialComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getLightMaterialComponent(uid, state);

let unsafeGetLightMaterialComponent = GameObjectGetComponentCommon.unsafeGetLightMaterialComponent;

let addLightMaterialComponent = GameObjectAddComponentCommon.addLightMaterialComponent;

let disposeLightMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeLightMaterialComponent(uid, component, state);

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

let create = (state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateCommon.create(state);
  let (state, transform) = TransformSystem.create(state);
  (addTransformComponent(uid, transform, state), uid)
};

let rec batchDispose = GameObjectDisposeCommon.batchDispose;

let dispose = GameObjectDisposeCommon.dispose;

let clone = GameObjectCloneCommon.clone;

let isAlive = (uid: int, state: StateDataType.state) => {
  let {transformMap, disposedUidMap} = GameObjectStateCommon.getGameObjectData(state);
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false
};

let initGameObject = (uid: int, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => GeometrySystem.handleInitComponent(geometry, state)
    | None => state
    };
  let state =
    switch (getBasicMaterialComponent(uid, state)) {
    | Some(material) =>
      BasicMaterialSystem.handleInitComponent(
        [@bs] DeviceManagerSystem.unsafeGetGl(state),
        material,
        state
      )
    | None => state
    };
  let state =
    switch (getLightMaterialComponent(uid, state)) {
    | Some(material) =>
      LightMaterialSystem.handleInitComponent(
        [@bs] DeviceManagerSystem.unsafeGetGl(state),
        material,
        state
      )
    | None => state
    };
  state
};

let deepCopyStateForRestore = GameObjectStateCommon.deepCopyStateForRestore;