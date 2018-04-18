open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _batchDisposeGeometryComponent = (uidArray, disposedUidMap, state) => {
  let (boxGeometryArr, customGeometryArr) =
    state |> BatchGetComponentGameObjectMainService.batchGetGeometryComponentData(uidArray);
  let (state, boxGeometryNeedDisposeVboBufferArr) =
    boxGeometryArr |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state);
  let state =
    customGeometryArr
    |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(state);
  (state, boxGeometryNeedDisposeVboBufferArr)
};

let batchDispose =
    (
      (uidArray: array(int), disposedUidMap, isKeepOrder),
      batchDisposeFunc,
      {gameObjectRecord} as state
    ) => {
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetTransformComponent(uidArray)
    |> batchDisposeTransformComponent(state, isKeepOrder);
  let (state, boxGeometryNeedDisposeVboBufferArrFromGeometry) =
    state |> _batchDisposeGeometryComponent(uidArray, disposedUidMap);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicCameraViewComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPerspectiveCameraProjectionComponent(
         uidArray
       )
    |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
         state
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetMeshRendererComponent(uidArray)
    |> batchDisposeMeshRendererComponent(disposedUidMap, state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicMaterialComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetLightMaterialComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetAmbientLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeAmbientLightComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetDirectionLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetPointLightComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposePointLightComponent(state);
  let (state, boxGeometryNeedDisposeVboBufferArrFromSourceInstance) =
    state
    |> BatchGetComponentGameObjectMainService.batchGetSourceInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         isKeepOrder,
         batchDisposeFunc
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetObjectInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state);
  (
    state,
    boxGeometryNeedDisposeVboBufferArrFromGeometry
    |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrFromSourceInstance)
  )
};