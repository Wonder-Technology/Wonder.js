let execJob = (configData, state) =>
  RenderBasicJob.execJob(configData, [@bs] DeviceManagerSystem.unsafeGetGl(state), state);

let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI; open GameObjectAPI;
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
let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObjectAPI; open GameObjectAPI;
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