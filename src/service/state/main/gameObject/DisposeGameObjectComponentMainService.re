open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let batchDispose =
    (
      (uidArray: array(int), isKeepOrder),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
        batchDisposeFunc,
      ),
      {gameObjectRecord} as state,
    ) => {
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetTransformComponent(
         uidArray,
       )
    |> batchDisposeTransformComponent(state, isKeepOrder);

  let (state, geometryNeedDisposeVboBufferArr) =
    state
    |> BatchGetComponentGameObjectMainService.batchGetGeometryComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeGeometryComponent(
         state,
       );

  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicCameraViewComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(
         state,
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPerspectiveCameraProjectionComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
         state,
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetArcballCameraControllerComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeArcballCameraControllerComponent(
         state,
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetMeshRendererComponent(
         uidArray,
       )
    |> batchDisposeMeshRendererComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicMaterialComponent(
         uidArray,
       )
    |> batchDisposeBasicMaterialComponentFunc(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetLightMaterialComponent(
         uidArray,
       )
    |> batchDisposeLightMaterialComponentFunc(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetDirectionLightComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(
         state,
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPointLightComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposePointLightComponent(
         state,
       );
  let (state, sourceInstanceNeedDisposeVboBufferArr) =
    state
    |> BatchGetComponentGameObjectMainService.batchGetSourceInstanceComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         isKeepOrder,
         batchDisposeFunc((
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         )),
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetObjectInstanceComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(
         state,
       );
  (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  );
};