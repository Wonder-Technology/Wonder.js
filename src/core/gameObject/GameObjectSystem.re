open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

open Contract;

let hasCameraControllerComponent = GameObjectComponentUtils.hasCameraControllerComponent;

let getCameraControllerComponent = GameObjectComponentUtils.getCameraControllerComponent;

let addCameraControllerComponent = GameObjectComponentUtils.addCameraControllerComponent;

let hasTransformComponent = GameObjectComponentUtils.hasTransformComponent;

let getTransformComponent = GameObjectComponentUtils.getTransformComponent;

let addTransformComponent = GameObjectComponentUtils.addTransformComponent;

let disposeTransformComponent = GameObjectComponentUtils.disposeTransformComponent;

let hasGeometryComponent = GameObjectComponentUtils.hasGeometryComponent;

let getGeometryComponent = GameObjectComponentUtils.getGeometryComponent;

let addGeometryComponent = GameObjectComponentUtils.addGeometryComponent;
let disposeGeometryComponent = GameObjectComponentUtils.disposeGeometryComponent;

let hasMeshRendererComponent = GameObjectComponentUtils.hasMeshRendererComponent;

let getMeshRendererComponent = GameObjectComponentUtils.getMeshRendererComponent;

let addMeshRendererComponent = GameObjectComponentUtils.addMeshRendererComponent;

let disposeMeshRendererComponent = GameObjectComponentUtils.disposeMeshRendererComponent;

let hasMaterialComponent = GameObjectComponentUtils.hasMaterialComponent;

let getMaterialComponent = GameObjectComponentUtils.getMaterialComponent;

let addMaterialComponent = GameObjectComponentUtils.addMaterialComponent;

let disposeMaterialComponent = GameObjectComponentUtils.disposeMaterialComponent;

let create = (state: StateDataType.state) => {
  let {uid, aliveUidArray} as data = GameObjectStateUtils.getGameObjectData(state);
  let newUIdStr = Js.Int.toString(uid);
  data.uid = increase(uid);
  aliveUidArray |> Js.Array.push(newUIdStr);
  let (newState, transform) = TransformSystem.create(state);
  (addTransformComponent(newUIdStr, transform, newState), newUIdStr)
};

let _isDisposeTooMany = (disposeCount: int, state: StateDataType.state) =>
  disposeCount >= state.memoryConfig.maxDisposeCount;

let dispose = (uid: string, state: StateDataType.state) => {
  let {disposeCount, disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  data.disposeCount = succ(disposeCount);
  disposedUidMap |> WonderCommonlib.HashMapSystem.set(uid, true) |> ignore;
  let state =
    switch (getTransformComponent(uid, state)) {
    | Some(transform) => disposeTransformComponent(uid, transform, state)
    | None => state
    };
  let state =
    switch (getMeshRendererComponent(uid, state)) {
    | Some(meshRenderer) => disposeMeshRendererComponent(uid, meshRenderer, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) => disposeMaterialComponent(uid, material, state)
    | None => state
    };
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => disposeGeometryComponent(uid, geometry, state)
    | None => state
    };
  /* todo dispose more components */
  if (_isDisposeTooMany(data.disposeCount, state)) {
    data.disposeCount = 0;
    CpuMemorySystem.reAllocateGameObject(state)
  } else {
    state
  }
};

let isAlive = (uid: string, state: StateDataType.state) => {
  let {disposedUidMap} as data = GameObjectStateUtils.getGameObjectData(state);
  switch (GameObjectDisposeUtils.isDisposed(uid, disposedUidMap)) {
  | false => hasTransformComponent(uid, state)
  | true => false
  }
};

let initGameObject = (uid: string, state: StateDataType.state) => {
  let state =
    switch (getGeometryComponent(uid, state)) {
    | Some(geometry) => GeometryInitComponentUtils.handleInitComponent(geometry, uid, state)
    | None => state
    };
  let state =
    switch (getMaterialComponent(uid, state)) {
    | Some(material) =>
      MaterialInitComponentUtils.handleInitComponent(
        [@bs] DeviceManagerSystem.getGl(state),
        material,
        uid,
        state
      )
    | None => state
    };
  state
};

let initData = () => {
  uid: 0,
  disposeCount: 0,
  disposedUidMap: WonderCommonlib.HashMapSystem.createEmpty(),
  aliveUidArray: WonderCommonlib.ArraySystem.createEmpty(),
  transformMap: WonderCommonlib.HashMapSystem.createEmpty(),
  cameraControllerMap: WonderCommonlib.HashMapSystem.createEmpty(),
  geometryMap: WonderCommonlib.HashMapSystem.createEmpty(),
  meshRendererMap: WonderCommonlib.HashMapSystem.createEmpty(),
  materialMap: WonderCommonlib.HashMapSystem.createEmpty()
};