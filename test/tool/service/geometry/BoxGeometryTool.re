open Js.Typed_array;

let createBoxGeometry = state => CustomGeometryAPI.createBoxGeometry(state);

let getBoxGeometryVertices = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();

  Float32Array.make(vertices);
};

let getBoxGeometryTexCoords = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();

  Float32Array.make(texCoords);
};

let getBoxGeometryNormals = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();

  Float32Array.make(normals);
};

let getBoxGeometryIndices = state => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();

  Uint16Array.make(indices);
};

let createGameObject = (state: StateDataMainType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectCustomGeometryComponent(
         gameObject,
         geometry,
       );

  (state, gameObject, geometry);
};

let getDefaultVertices = () => {
  let (vertices, texCoords, normals, indices) =
    ComputePointsBoxGeometryService.generateAllFaces();

  Float32Array.make(vertices);
};

let isGeometryDisposed = (geometry, state) =>
  !
    DisposeCustomGeometryMainService.isAlive(
      geometry,
      state |> RecordCustomGeometryMainService.getRecord,
    );