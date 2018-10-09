open StateDataMainType;

open RenderGroupType;

let buildRenderGroup = (meshRenderer, material) => {meshRenderer, material};

let createRenderGroup = ((createMeshRendererFunc, createMaterialFunc), state) => {
  let (state, meshRenderer) = createMeshRendererFunc(state);
  let (state, material) = createMaterialFunc(state);

  (state, buildRenderGroup(meshRenderer, material));
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

let replaceMaterial =
    (
      (
        {meshRenderer: sourceMeshRenderer, material: sourceMaterial},
        {meshRenderer: targetMeshRenderer, material: targetMaterial},
      ),
      gameObject,
      (deleteSourceMaterialFunc, addTargetMaterialFunc),
      state,
    ) => {
  let state =
    state
    |> deleteSourceMaterialFunc(gameObject, sourceMaterial)
    |> addTargetMaterialFunc(gameObject, targetMaterial)
    |> RenderArrayMeshRendererMainService.removeFromRenderGameObjectMap(
         sourceMeshRenderer,
       );

  let state = {
    ...state,
    meshRendererRecord:
      Some(
        RenderArrayMeshRendererMainService.addToRenderGameObjectMap(
          targetMeshRenderer,
          gameObject,
          RecordMeshRendererMainService.getRecord(state),
          state.gameObjectRecord,
        ),
      ),
  };

  state |> GameObjectAPI.initGameObject(gameObject);
};