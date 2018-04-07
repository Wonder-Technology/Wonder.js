open StateDataMainType;

let execJob = (configData, state) =>
  RenderBasicJob.execJob(
    configData,
    Obj.magic(1),
    state
  );

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open BoxGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let prepareGameObjectWithCustomGeometry = (sandbox, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open CustomGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, gameObject, customGeometry, (vertices, normals, indices)) =
    CustomGeometryTool.createGameObjectAndSetPointData(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, customGeometry, material, meshRenderer)
};

let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObjectAPI;
  open BasicMaterialAPI;
  open BoxGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  /* let (state, geometry) = BoxGeometryTool.createBoxGeometry(state); */
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};