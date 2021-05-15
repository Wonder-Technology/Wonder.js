let dispose = (rootGameObject, createdAllGameObjects, state) => {
  let allGameObjectsExistInScene =
    AllGameObjectMainService.getAllGameObjects(rootGameObject, state);

  let (state, _, _) =
    createdAllGameObjects
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. needDisposeGameObjects, gameObject) =>
           Js.Array.includes(gameObject, allGameObjectsExistInScene) ?
             needDisposeGameObjects :
             needDisposeGameObjects |> ArrayService.push(gameObject),
         [||],
       )
    |> DisposeGameObjectMainService.batchDispose(
         (
           DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponentData,
           DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentData,
         ),
         _,
         (false, false, false, false),
         state,
       );

  state;
};
