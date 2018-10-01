let prepareGameObject = (sandbox, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;
  open Sinon;

  let (state, material) = createLightMaterial(state);
  let (state, geometry) = BoxGeometryTool.createBoxGeometry(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponent(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};

let prepareGameObjectWithCreatedMap = (sandbox, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    prepareGameObject(sandbox, state);
  let (state, (texture1, texture2)) =
    LightMaterialTool.createAndSetMaps(material, state);
  (
    state,
    gameObject,
    geometry,
    material,
    meshRenderer,
    (texture1, texture2),
  );
};

let prepareGameObjectWithSharedGeometry =
    (sandbox, geometry, addGameObjectGeometryComponentFunc, state) => {
  open GameObjectAPI;
  open LightMaterialAPI;
  open MeshRendererAPI;
  open Sinon;

  let (state, material) = createLightMaterial(state);
  let (state, meshRenderer) = createMeshRenderer(state);
  let (state, gameObject) = state |> createGameObject;
  let state =
    state
    |> addGameObjectLightMaterialComponent(gameObject, material)
    |> addGameObjectGeometryComponentFunc(gameObject, geometry)
    |> addGameObjectMeshRendererComponent(gameObject, meshRenderer);
  (state, gameObject, geometry, material, meshRenderer);
};