open GameObjectType;

open ComponentType;

open GameObjectComponentCommon;

let _unsafeGetComponent = (uid: int, componentMap: array(int)) =>
  WonderCommonlib.SparseMapSystem.unsafeGet(uid, componentMap)
  |> WonderLog.Contract.ensureCheck(
       (component) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|component exist|j}, ~actual={j|not|j}),
                 () => component |> assertNullableExist
               )
             )
           )
         ),
       StateData.stateData.isDebug
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

let getBasicMaterialComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).basicMaterialMap |> getComponent(uid)
  );

let getLightMaterialComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).lightMaterialMap |> getComponent(uid)
  );

let unsafeGetBasicMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).basicMaterialMap |> _unsafeGetComponent(uid);

let unsafeGetLightMaterialComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).lightMaterialMap |> _unsafeGetComponent(uid);

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

let batchGetBasicMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).basicMaterialMap,
    state
  );

let batchGetLightMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).lightMaterialMap,
    state
  );

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