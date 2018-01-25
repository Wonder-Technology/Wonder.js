open GameObjectType;

open ComponentType;

/* let init = (state: StateDataType.state) =>
  state |> CameraControllerSystem.init |> GeometrySystem.init; */

let initDataFromState = (state: StateDataType.state) =>
  state |> TransformHelper.initData |> MaterialAdmin.initData |> GeometryHelper.initData;

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

let hasMaterialComponent = GameObjectHasComponentCommon.hasMaterialComponent;

let getMaterialComponent = (uid: int, state: StateDataType.state) =>
  [@bs] GameObjectGetComponentCommon.getMaterialComponent(uid, state);

let unsafeGetMaterialComponent = GameObjectGetComponentCommon.unsafeGetMaterialComponent;

let addMaterialComponent = GameObjectAddComponentCommon.addMaterialComponent;

let disposeMaterialComponent = (uid: int, component: component, state: StateDataType.state) =>
  [@bs] GameObjectDisposeComponentCommon.disposeMaterialComponent(uid, component, state);

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
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialSystem.handleInitComponent([@bs] DeviceManagerSystem.unsafeGetGl(state), material, state)
    | None => state
    };
  state
};

let deepCopyStateForRestore = GameObjectStateCommon.deepCopyStateForRestore;