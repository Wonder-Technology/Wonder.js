open GameObjectType;

open StateDataType;

open ComponentType;

open DisposeComponentGameObjectService;

open BatchGetComponentGameObjectService;

let _dispose = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

let dispose = (uid, state) =>
  state
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getTransformComponent,
         DisposeComponentGameObjectService.disposeTransformComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicCameraViewComponent,
         DisposeComponentGameObjectService.disposeBasicCameraViewComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
         DisposeComponentGameObjectService.disposePerspectiveCameraProjectionComponent
       )
     );

let batchDispose = (uidArray: array(int), disposedUidMap, state) => {
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetTransformComponent(uidArray)
    |> batchDisposeTransformComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetBasicCameraViewComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeBasicCameraViewComponent(
         disposedUidMap,
         state
       );
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetPerspectiveCameraProjectionComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposePerspectiveCameraProjectionComponent(
         disposedUidMap,
         state
       );
  state
};