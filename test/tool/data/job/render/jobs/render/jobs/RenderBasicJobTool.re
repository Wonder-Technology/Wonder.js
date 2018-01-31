let getJob = (configData, state) =>
  RenderBasicJob.getJob(configData, [@bs] DeviceManagerSystem.unsafeGetGl(state), state);

let prepareGameObject = (sandbox, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open MeshRenderer;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};
let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObject;
  open BasicMaterial;
  open BoxGeometry;
  open MeshRenderer;
  open Sinon;
  let (state, material) = createBasicMaterial(state);
  /* let (state, geometry) = BoxGeometryTool.createBoxGeometry(state); */
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectBasicMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};