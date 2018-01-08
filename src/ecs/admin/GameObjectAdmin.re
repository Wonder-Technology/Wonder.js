open Contract;

open GameObjectType;

let init = (state: StateDataType.state) =>
  state |> CameraControllerSystem.init |> GeometrySystem.init;

let initDataFromState = (state: StateDataType.state) =>
  state |> TransformHelper.initData |> MaterialAdmin.initData |> GeometryHelper.initData;

let update = (elapsed: float, state: StateDataType.state) =>
  state |> CameraControllerSystem.update;

let hasSourceInstanceComponent = GameObjectHasComponentCommon.hasSourceInstanceComponent;

let getSourceInstanceComponent = GameObjectGetComponentCommon.getSourceInstanceComponent;

let addSourceInstanceComponent = GameObjectAddComponentCommon.addSourceInstanceComponent;

let disposeSourceInstanceComponent = GameObjectDisposeComponentCommon.disposeSourceInstanceComponent;

let hasObjectInstanceComponent = GameObjectHasComponentCommon.hasObjectInstanceComponent;

let getObjectInstanceComponent = GameObjectGetComponentCommon.getObjectInstanceComponent;

let addObjectInstanceComponent = GameObjectAddComponentCommon.addObjectInstanceComponent;

let disposeObjectInstanceComponent = GameObjectDisposeComponentCommon.disposeObjectInstanceComponent;

let hasCameraControllerComponent = GameObjectHasComponentCommon.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectGetComponentCommon.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectAddComponentCommon.addCameraControllerComponent;

let disposeCameraControllerComponent = GameObjectDisposeComponentCommon.disposeCameraControllerComponent;

let hasTransformComponent = GameObjectHasComponentCommon.hasTransformComponent;

let getTransformComponent = GameObjectGetComponentCommon.getTransformComponent;

let unsafeGetTransformComponent = GameObjectGetComponentCommon.unsafeGetTransformComponent;

let addTransformComponent = GameObjectAddComponentCommon.addTransformComponent;

let disposeTransformComponent = GameObjectDisposeComponentCommon.disposeTransformComponent;

let hasGeometryComponent = GameObjectHasComponentCommon.hasGeometryComponent;

let getGeometryComponent = GameObjectGetComponentCommon.getGeometryComponent;

let unsafeGetGeometryComponent = GameObjectGetComponentCommon.unsafeGetGeometryComponent;

let addGeometryComponent = GameObjectAddComponentCommon.addGeometryComponent;

let disposeGeometryComponent = GameObjectDisposeComponentCommon.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectHasComponentCommon.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectGetComponentCommon.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectAddComponentCommon.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectDisposeComponentCommon.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectHasComponentCommon.hasMaterialComponent;

let getMaterialComponent = GameObjectGetComponentCommon.getMaterialComponent;

let unsafeGetMaterialComponent = GameObjectGetComponentCommon.unsafeGetMaterialComponent;

let addMaterialComponent = GameObjectAddComponentCommon.addMaterialComponent;

let disposeMaterialComponent = GameObjectDisposeComponentCommon.disposeMaterialComponent;

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
      MaterialSystem.handleInitComponent([@bs] DeviceManagerSystem.getGl(state), material, state)
    | None => state
    };
  state
};

let deepCopyStateForRestore = GameObjectStateCommon.deepCopyStateForRestore;