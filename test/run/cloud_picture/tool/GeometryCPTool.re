open Js.Typed_array;

let createGameObject = () => {
  let geometry = GeometryRunAPI.create()->ResultTool.getExnSuccessValue;
  let gameObject = GameObjectRunAPI.create()->ResultTool.getExnSuccessValue;

  GameObjectRunAPI.addGeometry(gameObject, geometry)
  ->ResultTool.getExnSuccessValueIgnore;

  (gameObject, geometry);
};

let createTwoGameObjectsAndSetPointData = () => {
  open GeometryRunAPI;

  let vertices1 = Float32Array.make([|10., 10., 11.|])->VerticesVO.create;
  let vertices2 = Float32Array.make([|3., 2., 3.|])->VerticesVO.create;
  let normals1 = Float32Array.make([|1., 2., 3.|])->NormalsVO.create;
  let normals2 = Float32Array.make([|2., 2., 4.|])->NormalsVO.create;
  let indices1 = Uint32Array.make([|2, 1, 0|])->IndicesVO.create;
  let indices2 = Uint32Array.make([|2, 0, 1|])->IndicesVO.create;
  let (gameObject1, geometry1) = createGameObject();
  let (gameObject2, geometry2) = createGameObject();

  setVertices(geometry1, vertices1)
  ->ResultTool.getExnSuccessValueIgnore;
  setVertices(geometry2, vertices2)
  ->ResultTool.getExnSuccessValueIgnore;
  setNormals(geometry1, normals1)
  ->ResultTool.getExnSuccessValueIgnore;
  setNormals(geometry2, normals2)
  ->ResultTool.getExnSuccessValueIgnore;
  setIndices(geometry1, indices1)
  ->ResultTool.getExnSuccessValueIgnore;
  setIndices(geometry2, indices2)
  ->ResultTool.getExnSuccessValueIgnore;
  (
    (gameObject1, gameObject2),
    (geometry1, geometry2),
    (vertices1, vertices2),
    (normals1, normals2),
    (indices1, indices2),
  );
};
