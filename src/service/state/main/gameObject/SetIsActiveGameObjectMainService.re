open StateDataMainType;

let setIsActive = (uid, isActive, {gameObjectRecord} as state) => {
  let state = {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      isActiveMap:
        gameObjectRecord.isActiveMap
        |> WonderCommonlib.MutableSparseMapService.set(uid, isActive),
    },
  };

  let state =
    switch (
      GetComponentGameObjectService.getScriptComponent(.
        uid,
        gameObjectRecord,
      )
    ) {
    | Some(script) =>
      state |> IsActiveScriptMainService.setIsActive(script, isActive)
    | None => state
    };

  let state =
    switch (
      GetComponentGameObjectService.getMeshRendererComponent(.
        uid,
        gameObjectRecord,
      )
    ) {
    | Some(meshRenderer) =>
      state
      |> OperateMeshRendererMainService.setIsRender(meshRenderer, isActive)
    | None => state
    };

  state;
};