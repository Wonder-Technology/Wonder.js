open MainStateDataType;

open CustomGeometryType;

open CustomGeometryAPI;

let getRecord = (state) => RecordCustomGeometryMainService.getRecord(state);

let createGameObject = (state: MainStateDataType.state) => {
  let (state, geometry) = createCustomGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectCustomGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry)
};

let createGameObjectAndSetPointData = (state: MainStateDataType.state) => {
  open Js.Typed_array;
  let (state, geometry) = createCustomGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state = state |> GameObjectAPI.addGameObjectCustomGeometryComponent(gameObject, geometry);
  let vertices1 = Float32Array.make([|10.|]);
  let normals1 = Float32Array.make([|1.|]);
  let indices1 = Uint16Array.make([|2|]);
  let state =
    state
    |> setCustomGeometryVertices(geometry, vertices1)
    |> setCustomGeometryNormals(geometry, normals1)
    |> setCustomGeometryIndices(geometry, indices1);
  (state, gameObject, geometry, (vertices1, normals1, indices1))
};

let createThreeGameObjectsAndSetPointData = (state) => {
  open Js.Typed_array;
  let vertices1 = Float32Array.make([|10.|]);
  let vertices2 = Float32Array.make([|3., 2.|]);
  let vertices3 = Float32Array.make([|5., 3., 2.|]);
  let normals1 = Float32Array.make([|1.|]);
  let normals2 = Float32Array.make([|2., 2.|]);
  let normals3 = Float32Array.make([|5., 1., 2.|]);
  let indices1 = Uint16Array.make([|2|]);
  let indices2 = Uint16Array.make([|2, 2|]);
  let indices3 = Uint16Array.make([|3, 3, 2|]);
  let (state, gameObject1, geometry1) = createGameObject(state);
  let (state, gameObject2, geometry2) = createGameObject(state);
  let (state, gameObject3, geometry3) = createGameObject(state);
  let state =
    state
    |> setCustomGeometryVertices(geometry1, vertices1)
    |> setCustomGeometryVertices(geometry2, vertices2)
    |> setCustomGeometryVertices(geometry3, vertices3)
    |> setCustomGeometryNormals(geometry1, normals1)
    |> setCustomGeometryNormals(geometry2, normals2)
    |> setCustomGeometryNormals(geometry3, normals3)
    |> setCustomGeometryIndices(geometry1, indices1)
    |> setCustomGeometryIndices(geometry2, indices2)
    |> setCustomGeometryIndices(geometry3, indices3);
  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (normals1, normals2, normals3),
    (indices1, indices2, indices3)
  )
};

let getGroupCount = (geometry, state) =>
  GroupCustomGeometryService.getGroupCount(
    geometry,
    state |> RecordCustomGeometryMainService.getRecord
  );

let isGeometryDisposed = (geometry, state) =>
  !
    DisposeCustomGeometryMainService.isAlive(
      geometry,
      state |> RecordCustomGeometryMainService.getRecord
    );

let getIndicesCount = IndicesCustomGeometryMainService.getIndicesCount;

let unsafeGetCustomGeometryComponent = (uid: int, {gameObjectRecord}) =>
  GetComponentGameObjectService.unsafeGetGeometryComponent(uid, gameObjectRecord)
  |> WonderLog.Contract.ensureCheck(
       (r) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|type_ is box|j}, ~actual={j|not|j}),
                 () => {
                   let (_, type_, _, _) =
                     GetComponentGameObjectService.unsafeGetGeometryComponentData(
                       uid,
                       gameObjectRecord
                     );
                   type_ ==^ CurrentComponentDataMapService.getCustomGeometryType()
                 }
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );