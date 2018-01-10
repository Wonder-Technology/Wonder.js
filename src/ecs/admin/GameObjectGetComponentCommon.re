open GameObjectType;

open ComponentType;

open GameObjectComponentCommon;

open Contract;

let _unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(uid, componentMap)
  |> ensureCheck(
       (component) =>
         Contract.Operators.(
           test("component should exist", () => component |> assertNullableExist)
         )
     );

let getSourceInstanceComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap |> getComponent(uid)
  );

let unsafeGetSourceInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap |> _unsafeGetComponent(uid);

let getObjectInstanceComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).objectInstanceMap |> getComponent(uid)
  );

let unsafeGetObjectInstanceComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).objectInstanceMap |> _unsafeGetComponent(uid);

let getCameraControllerComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).cameraControllerMap |> getComponent(uid)
  );

let getTransformComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).transformMap |> getComponent(uid)
  );

let unsafeGetTransformComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).transformMap |> _unsafeGetComponent(uid);

let getGeometryComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).geometryMap |> getComponent(uid)
  );

let unsafeGetGeometryComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).geometryMap |> _unsafeGetComponent(uid);

let getMeshRendererComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).meshRendererMap |> getComponent(uid)
  );

let getMaterialComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).materialMap |> getComponent(uid)
  );

let unsafeGetMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).materialMap |> _unsafeGetComponent(uid);

let _batchGetComponent = (uidArray: array(int), componentMap, state: StateDataType.state) =>
  uidArray
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         (arr, uid) =>
           switch (componentMap |> getComponent(uid)) {
           | None => arr
           | Some(component) =>
             arr |> Js.Array.push(component) |> ignore;
             arr
           }
       ),
       [||]
     );

let batchGetTransformComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).transformMap, state);

let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).meshRendererMap,
    state
  );

let batchGetMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).materialMap, state);

let batchGetGeometryComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(uidArray, GameObjectStateCommon.getGameObjectData(state).geometryMap, state);

let batchGetCameraControllerComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).cameraControllerMap,
    state
  );

let batchGetSourceInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).sourceInstanceMap,
    state
  );

let batchGetObjectInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).objectInstanceMap,
    state
  );