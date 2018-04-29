open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _batchDisposeGeometryComponent = (uidArray, state) => {
  let (boxGeometryArr, customGeometryArr) =
    state |> BatchGetComponentGameObjectMainService.batchGetGeometryComponentData(uidArray);
  let (state, boxGeometryNeedDisposeVboBufferArr) =
    boxGeometryArr |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state);
  let (state, customGeometryNeedDisposeVboBufferArr) =
    customGeometryArr
    |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(state);
  (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr)
};

let batchDispose =
    (
      (uidArray: array(int), disposedUidMap, isKeepOrder),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
        batchDisposeFunc
      ),
      {gameObjectRecord} as state
    ) => {
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetTransformComponent(uidArray)
    |> batchDisposeTransformComponent(state, isKeepOrder);
  let (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr) =
    state |> _batchDisposeGeometryComponent(uidArray);
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
    |> batchDisposeBasicMaterialComponentFunc(state);
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetLightMaterialComponent(uidArray)
    |> batchDisposeLightMaterialComponentFunc(state);
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
  let (state, sourceInstanceNeedDisposeVboBufferArr) =
    state
    |> BatchGetComponentGameObjectMainService.batchGetSourceInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         isKeepOrder,
         batchDisposeFunc((
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc
         ))
       );
  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetObjectInstanceComponent(uidArray)
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state);
  (
    state,
    boxGeometryNeedDisposeVboBufferArr,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr
  )
};