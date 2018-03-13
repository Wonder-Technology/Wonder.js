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

let _disposeSourceInstanceComponent = (uid, batchDisposeFunc, state) =>
  switch (
    [@bs] GetComponentGameObjectService.getSourceInstanceComponent(uid, state.gameObjectRecord)
  ) {
  | Some(component) =>
    [@bs]
    DisposeSourceInstanceService.handleDisposeComponent(component, batchDisposeFunc, state)
  | None => state
  };

let dispose = (uid, batchDisposeFunc, state) =>
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
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getMeshRendererComponent,
         DisposeComponentGameObjectService.disposeMeshRendererComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBoxGeometryComponent,
         DisposeComponentGameObjectService.disposeBoxGeometryComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicMaterialComponent,
         DisposeComponentGameObjectService.disposeBasicMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getLightMaterialComponent,
         DisposeComponentGameObjectService.disposeLightMaterialComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getAmbientLightComponent,
         DisposeComponentGameObjectService.disposeAmbientLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getDirectionLightComponent,
         DisposeComponentGameObjectService.disposeDirectionLightComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPointLightComponent,
         DisposeComponentGameObjectService.disposePointLightComponent
       )
     )
  /* |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getSourceInstanceComponent,
         DisposeComponentGameObjectService.disposeSourceInstanceComponent
       )
     ) */
  |> _disposeSourceInstanceComponent(uid, batchDisposeFunc)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getObjectInstanceComponent,
         DisposeComponentGameObjectService.disposeObjectInstanceComponent
       )
     );

let batchDispose = (uidArray: array(int), disposedUidMap, batchDisposeFunc, state) => {
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
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetMeshRendererComponent(uidArray)
    |> batchDisposeMeshRendererComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetBoxGeometryComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeBoxGeometryComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetBasicMaterialComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeBasicMaterialComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetLightMaterialComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeLightMaterialComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetAmbientLightComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeAmbientLightComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetDirectionLightComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeDirectionLightComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetPointLightComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposePointLightComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetSourceInstanceComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeSourceInstanceComponent(disposedUidMap, state, batchDisposeFunc);
  let state =
    state
    |> BatchGetComponentGameObjectService.batchGetObjectInstanceComponent(uidArray)
    |> DisposeComponentGameObjectService.batchDisposeObjectInstanceComponent(disposedUidMap, state);
  state
};