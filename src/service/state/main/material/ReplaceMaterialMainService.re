open StateDataMainType;

let replaceMaterial =
    (
      (
        (sourceMeshRenderer, sourceMaterial),
        (targetMeshRenderer, targetMaterial),
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