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

let getBasicCameraViewComponent =
  [@bs]
  (
    (uid: int, gameObjectRecord) =>
      gameObjectRecord.basicCameraViewMap |> getComponent(uid)
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

let getAmbientLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).ambientLightMap |> getComponent(uid)
  );

let unsafeGetAmbientLightComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).ambientLightMap |> _unsafeGetComponent(uid);

let getDirectionLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).directionLightMap |> getComponent(uid)
  );

let unsafeGetDirectionLightComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).directionLightMap |> _unsafeGetComponent(uid);

let getPointLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      GameObjectStateCommon.getGameObjectData(state).pointLightMap |> getComponent(uid)
  );

let unsafeGetPointLightComponent = (uid: int, state: StateDataType.state) =>
  GameObjectStateCommon.getGameObjectData(state).pointLightMap |> _unsafeGetComponent(uid);

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

let batchGetAmbientLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).ambientLightMap,
    state
  );

let batchGetDirectionLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).directionLightMap,
    state
  );

let batchGetPointLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    GameObjectStateCommon.getGameObjectData(state).pointLightMap,
    state
  );