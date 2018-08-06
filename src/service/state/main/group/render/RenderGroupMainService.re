open StateDataMainType;

open RenderGroupType;

let createRenderGroup = ((createMeshRendererFunc, createMaterialFunc), state) => {
  let (state, meshRenderer) = createMeshRendererFunc(state);
  let (state, material) = createMaterialFunc(state);

  (state, {meshRenderer, material});
};

let addRenderGroupComponents =
    (
      gameObject,
      {meshRenderer, material},
      (addMeshRendererComponentFunc, addMaterialComponentFunc),
      state,
    ) =>
  state
  |> addMaterialComponentFunc(gameObject, material)
  |> addMeshRendererComponentFunc(gameObject, meshRenderer);

let disposeRenderGroupComponents =
    (
      gameObject,
      {meshRenderer, material},
      (disposeMeshRendererComponentFunc, disposeMaterialComponentFunc),
      state,
    ) =>
  state
  |> disposeMaterialComponentFunc(gameObject, material)
  |> disposeMeshRendererComponentFunc(gameObject, meshRenderer);

let unsafeGetRenderGroupComponents =
    (
      gameObject,
      (unsafeGetMeshRendererComponentFunc, unsafeGetMaterialComponentFunc),
      state,
    ) => {
  meshRenderer: state |> unsafeGetMeshRendererComponentFunc(gameObject),
  material: state |> unsafeGetMaterialComponentFunc(gameObject),
};

let hasRenderGroupComponents =
    (
      gameObject,
      (hasMeshRendererComponentFunc, hasMaterialComponentFunc),
      state,
    ) =>
  state
  |> hasMeshRendererComponentFunc(gameObject)
  && state
  |> hasMaterialComponentFunc(gameObject);

let replaceRenderGroupComponents =
    (
      (
        {meshRenderer: sourceMeshRenderer, material: sourceMaterial},
        {meshRenderer: targetMeshRenderer, material: targetMaterial},
      ),
      gameObject,
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      state,
    ) => {
  let state =
    state
    |> disposeSourceMaterialFunc(gameObject, sourceMaterial)
    |> addTargetMaterialFunc(gameObject, targetMaterial);

  DisposeComponentGameObjectMainService.deferDisposeMeshRendererComponent(.
    gameObject,
    sourceMeshRenderer,
    state,
  )
  |> AddComponentGameObjectMainService.addMeshRendererComponent(
       gameObject,
       targetMeshRenderer,
     )
  |> GameObjectAPI.initGameObject(gameObject);
};