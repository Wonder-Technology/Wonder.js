open Js.Typed_array;

let createBoxGeometry = state => GeometryAPI.createBoxGeometry(state);

let getFacesData = () => (5., 5., 5., 1, 1, 1);

let getBoxGeometryVertices = state => {
  let (vertices, texCoords, normals, indices) =
    ComputeBoxPointsGeometryService.generateAllFaces(getFacesData());

  Float32Array.make(vertices);
};

let getBoxGeometryTexCoords = state => {
  let (vertices, texCoords, normals, indices) =
    ComputeBoxPointsGeometryService.generateAllFaces(getFacesData());

  Float32Array.make(texCoords);
};

let getBoxGeometryNormals = state => {
  let (vertices, texCoords, normals, indices) =
    ComputeBoxPointsGeometryService.generateAllFaces(getFacesData());

  Float32Array.make(normals);
};

let getBoxGeometryIndices = state => {
  let (vertices, texCoords, normals, indices) =
    ComputeBoxPointsGeometryService.generateAllFaces(getFacesData());

  Uint16Array.make(indices);
};

let createGameObject = (state: StateDataMainType.state) => {
  let (state, geometry) = createBoxGeometry(state);
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let state =
    state
    |> GameObjectAPI.addGameObjectGeometryComponent(gameObject, geometry);

  (state, gameObject, geometry);
};

let getDefaultVertices = () => {
  let (vertices, texCoords, normals, indices) =
    ComputeBoxPointsGeometryService.generateAllFaces(getFacesData());

  Float32Array.make(vertices);
};

let isGeometryDisposed = (geometry, state) =>
  !
    DisposeGeometryMainService.isAliveWithRecord(
      geometry,
      state |> RecordGeometryMainService.getRecord,
    );

let isBoxGeometry = (geometry, state) =>
  GeometryAPI.getGeometryVertices(geometry, state)
  == getBoxGeometryVertices(state);