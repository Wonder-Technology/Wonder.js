open StateDataMainType;

let replaceMaterial =
    (
      (sourceMaterial, targetMaterial),
      gameObject,
      (disposeSourceMaterialFunc, addTargetMaterialFunc),
      state,
    ) => {
  let state = disposeSourceMaterialFunc(gameObject, sourceMaterial, state);
  let state = addTargetMaterialFunc(gameObject, targetMaterial, state);

  let state =
    switch (
      GetComponentGameObjectService.getMeshRendererComponent(.
        gameObject,
        state.gameObjectRecord,
      )
    ) {
    | None => state
    | Some(meshRenderer) =>
      let state =
        DisposeComponentGameObjectMainService.deferDisposeMeshRendererComponent(.
          gameObject,
          meshRenderer,
          state,
        );

      let (meshRendererRecord, newMeshRenderer) =
        CreateMeshRendererService.create(state.meshRendererRecord);

      {...state, meshRendererRecord}
      |> AddComponentGameObjectMainService.addMeshRendererComponent(
           gameObject,
           newMeshRenderer,
         );
    };

  let state = GameObjectAPI.initGameObject(gameObject, state);

  state;
};