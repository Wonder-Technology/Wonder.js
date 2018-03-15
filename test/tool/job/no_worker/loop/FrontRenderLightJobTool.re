let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI; open GameObjectAPI;
  open LightMaterialAPI;
  open BoxGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};

let prepareGameObjectWithSharedGeometry = (sandbox, geometry, state) => {
  open GameObjectAPI; open GameObjectAPI;
  open LightMaterialAPI;
  open BoxGeometryAPI;
  open MeshRendererAPI;
  open Sinon;
  let (state, material) = createLightMaterial(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectBoxGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer)
};