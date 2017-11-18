open UidUtils;

open ComponentType;

open StateDataType;

open GameObjectType;

open Contract;

let _getComponent =
    (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int))
    : option(component) =>
  WonderCommonlib.HashMapSystem.get(uid, componentMap);

let _hasComponent = (uid: string, componentMap: WonderCommonlib.HashMapSystem.t(int)) : bool =>
  Js.Option.isSome(_getComponent(uid, componentMap));

let _addComponent =
    (uid: string, component: component, componentMap: WonderCommonlib.HashMapSystem.t(int)) => {
  requireCheck(
    () =>
      test(
        "this type of component is already exist, shouldn't add again",
        () => _hasComponent(uid, componentMap) |> assertFalse
      )
  );
  WonderCommonlib.HashMapSystem.set(uid, component, componentMap) |> ignore
};

let hasCameraControllerComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _hasComponent(uid);

let getCameraControllerComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap |> _getComponent(uid);

let addCameraControllerComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).cameraControllerMap
  |> _addComponent(uid, component)
  |> ignore;
  CameraControllerAddComponentUtils.handleAddComponent(component, uid, state)
};

let hasTransformComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _hasComponent(uid);

let getTransformComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).transformMap |> _getComponent(uid);

let addTransformComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).transformMap
  |> _addComponent(uid, component)
  |> ignore;
  TransformAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeTransformComponent = (uid: string, component: component, state: StateDataType.state) =>
  TransformDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasGeometryComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _hasComponent(uid);

let getGeometryComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).geometryMap |> _getComponent(uid);

let addGeometryComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).geometryMap
  |> _addComponent(uid, component)
  |> ignore;
  GeometryAddComponentUtils.handleAddComponent(component, uid, state)
};

let hasMeshRendererComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _hasComponent(uid);

let getMeshRendererComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap |> _getComponent(uid);

let addMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).meshRendererMap
  |> _addComponent(uid, component)
  |> ignore;
  MeshRendererAddComponentUtils.handleAddComponent(component, uid, state)
};

let disposeMeshRendererComponent = (uid: string, component: component, state: StateDataType.state) =>
  MeshRendererDisposeComponentUtils.handleDisposeComponent(component, uid, state);

let hasMaterialComponent = (uid: string, state: StateDataType.state) : bool =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _hasComponent(uid);

let getMaterialComponent = (uid: string, state: StateDataType.state) =>
  GameObjectStateUtils.getGameObjectData(state).materialMap |> _getComponent(uid);

let addMaterialComponent = (uid: string, component: component, state: StateDataType.state) => {
  GameObjectStateUtils.getGameObjectData(state).materialMap
  |> _addComponent(uid, component)
  |> ignore;
  MaterialAddComponentUtils.handleAddComponent(component, uid, state)
};

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
    | Some(transform) => disposeMeshRendererComponent(uid, transform, state)
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