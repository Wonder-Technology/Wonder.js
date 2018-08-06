open RenderGroupType;

let buildRenderGroup = (meshRenderer, material) => {meshRenderer, material};

let createRenderGroup = state =>
  RenderGroupAPI.createRenderGroup(
    (
      MeshRendererAPI.createMeshRenderer,
      LightMaterialAPI.createLightMaterial,
    ),
    state,
  );

let addGameObjectRenderGroupComponents = (gameObject, cameraGroup, state) =>
  RenderGroupAPI.addGameObjectRenderGroupComponents(
    gameObject,
    cameraGroup,
    (
      GameObjectAPI.addGameObjectMeshRendererComponent,
      GameObjectAPI.addGameObjectLightMaterialComponent,
    ),
    state,
  );

let disposeGameObjectRenderGroupComponents = (gameObject, cameraGroup, state) =>
  RenderGroupAPI.disposeGameObjectRenderGroupComponents(
    gameObject,
    cameraGroup,
    (
      GameObjectAPI.disposeGameObjectMeshRendererComponent,
      GameObjectAPI.disposeGameObjectLightMaterialComponent,
    ),
    state,
  );

let unsafeGetGameObjectRenderGroupComponents = (gameObject, state) =>
  RenderGroupAPI.unsafeGetGameObjectRenderGroupComponents(
    gameObject,
    (
      GameObjectAPI.unsafeGetGameObjectMeshRendererComponent,
      GameObjectAPI.unsafeGetGameObjectLightMaterialComponent,
    ),
    state,
  );

let hasGameObjectRenderGroupComponents = (gameObject, state) =>
  RenderGroupAPI.hasGameObjectRenderGroupComponents(
    gameObject,
    (
      GameObjectAPI.hasGameObjectMeshRendererComponent,
      GameObjectAPI.hasGameObjectLightMaterialComponent,
    ),
    state,
  );