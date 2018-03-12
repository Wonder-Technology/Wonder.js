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
      state.gameObjectRecord.sourceInstanceMap |> getComponent(uid)
  );

let unsafeGetSourceInstanceComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.sourceInstanceMap |> _unsafeGetComponent(uid);

let getObjectInstanceComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.objectInstanceMap |> getComponent(uid)
  );

let unsafeGetObjectInstanceComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.objectInstanceMap |> _unsafeGetComponent(uid);

let getBasicCameraViewComponent =
  [@bs] ((uid: int, gameObjectRecord) => gameObjectRecord.basicCameraViewMap |> getComponent(uid));

let getMeshRendererComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.meshRendererMap |> getComponent(uid)
  );

let getBasicMaterialComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.basicMaterialMap |> getComponent(uid)
  );

let getLightMaterialComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.lightMaterialMap |> getComponent(uid)
  );

let unsafeGetBasicMaterialComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.basicMaterialMap |> _unsafeGetComponent(uid);

let unsafeGetLightMaterialComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.lightMaterialMap |> _unsafeGetComponent(uid);

let getAmbientLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.ambientLightMap |> getComponent(uid)
  );

let unsafeGetAmbientLightComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.ambientLightMap |> _unsafeGetComponent(uid);

let getDirectionLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.directionLightMap |> getComponent(uid)
  );

let unsafeGetDirectionLightComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.directionLightMap |> _unsafeGetComponent(uid);

let getPointLightComponent =
  [@bs]
  (
    (uid: int, state: StateDataType.state) =>
      state.gameObjectRecord.pointLightMap |> getComponent(uid)
  );

let unsafeGetPointLightComponent = (uid: int, state: StateDataType.state) =>
  state.gameObjectRecord.pointLightMap |> _unsafeGetComponent(uid);

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

let batchGetMeshRendererComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.meshRendererMap,
    state
  );

let batchGetBasicMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.basicMaterialMap,
    state
  );

let batchGetLightMaterialComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.lightMaterialMap,
    state
  );

let batchGetSourceInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.sourceInstanceMap,
    state
  );

let batchGetObjectInstanceComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.objectInstanceMap,
    state
  );

let batchGetAmbientLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.ambientLightMap,
    state
  );

let batchGetDirectionLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.directionLightMap,
    state
  );

let batchGetPointLightComponent = (uidArray: array(int), state: StateDataType.state) =>
  _batchGetComponent(
    uidArray,
    state.gameObjectRecord.pointLightMap,
    state
  );