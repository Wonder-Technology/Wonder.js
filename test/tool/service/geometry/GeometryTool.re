open StateDataMainType;

open GeometryType;

open GeometryAPI;

let buildInfo = (startIndex, endIndex) => (startIndex, endIndex);

let getInfo = (index, infos) =>
  ReallocatedPointsGeometryService.getInfo(
    BufferGeometryService.getInfoIndex(index),
    infos,
  );

let getRecord = state => RecordGeometryMainService.getRecord(state);

let createGameObject = (state: StateDataMainType.state) => {
  let (state, geometry) = createGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
  (state, gameObject, geometry);
};

let createGameObjectAndSetPointData = (state: StateDataMainType.state) => {
  open Js.Typed_array;
  let (state, geometry) = createGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);
  let vertices1 = Float32Array.make([|10.|]);
  let texCoords1 = Float32Array.make([|0.5|]);
  let normals1 = Float32Array.make([|1.|]);
  let indices1 = Uint16Array.make([|2|]);
  let state =
    state
    |> setGeometryVertices(geometry, vertices1)
    |> setGeometryTexCoords(geometry, texCoords1)
    |> setGeometryNormals(geometry, normals1)
    |> setGeometryIndices16(geometry, indices1);
  (state, gameObject, geometry, (vertices1, texCoords1, normals1, indices1));
};

let createThreeGameObjectsAndSetPointData = state => {
  open Js.Typed_array;
  let vertices1 = Float32Array.make([|10., 10., 11.|]);
  let vertices2 = Float32Array.make([|3., 2., 3.|]);
  let vertices3 = Float32Array.make([|5., 3., 2.|]);
  let texCoords1 = Float32Array.make([|0.5, 0.5|]);
  let texCoords2 = Float32Array.make([|0., 1.|]);
  let texCoords3 = Float32Array.make([|0., 0.5|]);
  let normals1 = Float32Array.make([|1., 2., 3.|]);
  let normals2 = Float32Array.make([|2., 2., 4.|]);
  let normals3 = Float32Array.make([|5., 1., 2.|]);
  let indices1 = Uint16Array.make([|2, 1, 0|]);
  let indices2 = Uint16Array.make([|2, 0, 1|]);
  let indices3 = Uint16Array.make([|0, 1, 2|]);
  let (state, gameObject1, geometry1) = createGameObject(state);
  let (state, gameObject2, geometry2) = createGameObject(state);
  let (state, gameObject3, geometry3) = createGameObject(state);
  let state =
    state
    |> setGeometryVertices(geometry1, vertices1)
    |> setGeometryVertices(geometry2, vertices2)
    |> setGeometryVertices(geometry3, vertices3)
    |> setGeometryTexCoords(geometry1, texCoords1)
    |> setGeometryTexCoords(geometry2, texCoords2)
    |> setGeometryTexCoords(geometry3, texCoords3)
    |> setGeometryNormals(geometry1, normals1)
    |> setGeometryNormals(geometry2, normals2)
    |> setGeometryNormals(geometry3, normals3)
    |> setGeometryIndices16(geometry1, indices1)
    |> setGeometryIndices16(geometry2, indices2)
    |> setGeometryIndices16(geometry3, indices3);
  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (indices1, indices2, indices3),
  );
};

let createThreeGameObjectsAndSetFullPointData = state => {
  open Js.Typed_array;
  let vertices1 = Float32Array.make([|11., 10., 11.|]);
  let vertices2 = Float32Array.make([|2., 2., 3.|]);
  let vertices3 = Float32Array.make([|4., 3., 2.|]);
  let texCoords1 = Float32Array.make([|0.5, 1.5|]);
  let texCoords2 = Float32Array.make([|1., 2.|]);
  let texCoords3 = Float32Array.make([|1., 0.5|]);
  let normals1 = Float32Array.make([|1., 3., 3.|]);
  let normals2 = Float32Array.make([|2., 4., 4.|]);
  let normals3 = Float32Array.make([|5., 4., 2.|]);
  let indices1 = Uint16Array.make([|2, 0, 1|]);
  let indices2 = Uint16Array.make([|2, 1, 0|]);
  let indices3 = Uint16Array.make([|1, 0, 2|]);
  let indices32_1 = Uint32Array.make([|1, 2, 0|]);
  let indices32_2 = Uint32Array.make([|1, 2, 1|]);
  let indices32_3 = Uint32Array.make([|1, 0, 2|]);
  let (state, gameObject1, geometry1) = createGameObject(state);
  let (state, gameObject2, geometry2) = createGameObject(state);
  let (state, gameObject3, geometry3) = createGameObject(state);
  let state =
    state
    |> setGeometryVertices(geometry1, vertices1)
    |> setGeometryVertices(geometry2, vertices2)
    |> setGeometryVertices(geometry3, vertices3)
    |> setGeometryTexCoords(geometry1, texCoords1)
    |> setGeometryTexCoords(geometry2, texCoords2)
    |> setGeometryTexCoords(geometry3, texCoords3)
    |> setGeometryNormals(geometry1, normals1)
    |> setGeometryNormals(geometry2, normals2)
    |> setGeometryNormals(geometry3, normals3)
    |> setGeometryIndices16(geometry1, indices1)
    |> setGeometryIndices16(geometry2, indices2)
    |> setGeometryIndices16(geometry3, indices3)
    |> setGeometryIndices32(geometry1, indices32_1)
    |> setGeometryIndices32(geometry2, indices32_2)
    |> setGeometryIndices32(geometry3, indices32_3);

  (
    state,
    (gameObject1, gameObject2, gameObject3),
    (geometry1, geometry2, geometry3),
    (vertices1, vertices2, vertices3),
    (texCoords1, texCoords2, texCoords3),
    (normals1, normals2, normals3),
    (
      (indices1, indices2, indices3),
      (indices32_1, indices32_2, indices32_3),
    ),
  );
};

/* let getGroupCount = (geometry, state) =>
   GroupGeometryService.getGroupCount(
     geometry,
     state |> RecordGeometryMainService.getRecord,
   ); */

let hasGameObject = (geometry, state) =>
  switch (
    GameObjectGeometryService.getGameObjects(geometry, getRecord(state))
  ) {
  | Some(arr) when arr |> Js.Array.length > 0 => true
  | _ => false
  };

let isGeometryDisposed = (geometry, state) =>
  !
    DisposeGeometryMainService.isAliveWithRecord(
      geometry,
      state |> RecordGeometryMainService.getRecord,
    );

let getIndicesCount = (index: int, state: StateRenderType.renderState) =>
  GetGeometryIndicesRenderService.getIndicesCount(. index, state);

let unsafeGetGeometryComponent = (uid: int, {gameObjectRecord}) =>
  GetComponentGameObjectService.unsafeGetGeometryComponent(
    uid,
    gameObjectRecord,
  );

let _getMainVertexData = (geometry, count, getGeometryVertexFunc, state) => {
  open Js.Typed_array;

  let points = getGeometryVertexFunc(geometry, state);

  let length = points |> Float32Array.length;

  let mainVertexs = Float32Array.fromLength(count);

  length > count ?
    {
      TypeArrayService.fillFloat32ArrayWithOffset(
        mainVertexs,
        Float32Array.slice(~start=0, ~end_=count / 2, points),
        0,
      );

      TypeArrayService.fillFloat32ArrayWithOffset(
        mainVertexs,
        Float32Array.slice(
          ~start=length - count / 2 - 1,
          ~end_=length - 1,
          points,
        ),
        count / 2,
      );

      mainVertexs;
    } :
    points;
};

let getMainVertices = (geometry, state) =>
  _getMainVertexData(geometry, 60, GeometryAPI.getGeometryVertices, state);

let getMainNormals = (geometry, state) =>
  _getMainVertexData(geometry, 60, GeometryAPI.getGeometryNormals, state);

let getMainTexCoords = (geometry, state) =>
  _getMainVertexData(geometry, 40, GeometryAPI.getGeometryTexCoords, state);

let getMainIndices16 = (geometry, state) =>
  Js.Typed_array.(
    GeometryType.(
      switch (
        IndicesGeometryMainService.unsafeGetIndicesType(geometry, state)
      ) {
      | Short =>
        let indices = GeometryAPI.getGeometryIndices16(geometry, state);

        let count = 60;

        let length = indices |> Uint16Array.length;

        let mainVertexs = Uint16Array.fromLength(count);

        length > count ?
          {
            TypeArrayService.fillUint16ArrayWithOffset(
              mainVertexs,
              Uint16Array.slice(~start=0, ~end_=count / 2, indices),
              0,
            );

            TypeArrayService.fillUint16ArrayWithOffset(
              mainVertexs,
              Uint16Array.slice(
                ~start=length - count / 2 - 1,
                ~end_=length - 1,
                indices,
              ),
              count / 2,
            );

            mainVertexs |. Some;
          } :
          indices |. Some;
      | _ => None
      }
    )
  );

let getMainIndices32 = (geometry, state) =>
  Js.Typed_array.(
    GeometryType.(
      switch (
        IndicesGeometryMainService.unsafeGetIndicesType(geometry, state)
      ) {
      | Int =>
        let indices = GeometryAPI.getGeometryIndices32(geometry, state);

        let count = 60;

        let length = indices |> Uint32Array.length;

        let mainVertexs = Uint32Array.fromLength(count);

        length > count ?
          {
            TypeArrayService.fillUint32ArrayWithOffset(
              mainVertexs,
              Uint32Array.slice(~start=0, ~end_=count / 2, indices),
              0,
            );

            TypeArrayService.fillUint32ArrayWithOffset(
              mainVertexs,
              Uint32Array.slice(
                ~start=length - count / 2 - 1,
                ~end_=length - 1,
                indices,
              ),
              count / 2,
            );

            mainVertexs |. Some;
          } :
          indices |. Some;
      | _ => None
      }
    )
  );

let getIndexType = (state: StateRenderType.renderState) =>
  WonderWebgl.Gl.getUnsignedShort(
    AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
  );

let getIndexTypeSize = (state: StateRenderType.renderState) => Js.Typed_array.Uint16Array._BYTES_PER_ELEMENT;

let isGeometry = geometry => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(geometry) >= 0;
};

let batchDisposeGeometryByCloseContractCheck = (gameObjectArr, state) => {
  let state = state |> GameObjectTool.batchDisposeGameObject(gameObjectArr);
  TestTool.openContractCheck();
  state;
};

let getName = (geometry, state) =>
  NameGeometryMainService.getName(geometry, state);