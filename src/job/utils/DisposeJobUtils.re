open StateDataMainType;

open GameObjectType;

let _disposeComponents =
    (
      batchDisposeBasicMaterialComponentFunc,
      batchDisposeLightMaterialComponentFunc,
      {settingRecord, gameObjectRecord} as state,
    ) => {
  let {
    disposedBasicCameraViewArray,
    disposedTransformArray,
    disposedTransformArrayForKeepOrder,
    disposedPerspectiveCameraProjectionArray,
    disposedArcballCameraControllerArray,
    disposedBasicMaterialArray,
    disposedLightMaterialArray,
    disposedGeometryDataArray,
    disposedSourceInstanceArray,
    disposedObjectInstanceArray,
    disposedDirectionLightArray,
    disposedPointLightArray,
    disposedMeshRendererComponentArray,
  } = gameObjectRecord;
  let state =
    disposedBasicCameraViewArray
    |> DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(
         state,
       );
  let state =
    disposedPerspectiveCameraProjectionArray
    |> DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
         state,
       );
  let state =
    disposedArcballCameraControllerArray
    |> DisposeComponentGameObjectMainService.batchDisposeArcballCameraControllerComponent(
         state,
       );
  let state =
    disposedTransformArray
    |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(
         state,
         false,
       );
  let state =
    disposedTransformArrayForKeepOrder
    |> DisposeComponentGameObjectMainService.batchDisposeTransformComponent(
         state,
         true,
       );
  let state =
    disposedBasicMaterialArray
    |> batchDisposeBasicMaterialComponentFunc(state);
  let state =
    disposedLightMaterialArray
    |> batchDisposeLightMaterialComponentFunc(state);
  let (state, geometryNeedDisposeVboBufferArr) =
    disposedGeometryDataArray
    |> DisposeComponentGameObjectMainService.batchDisposeGeometryComponent(
         state,
       );
  let (state, sourceInstanceNeedDisposeVboBufferArr) =
    disposedSourceInstanceArray
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         false,
         DisposeGameObjectMainService.batchDispose((
           batchDisposeLightMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         )),
       );
  let state =
    disposedObjectInstanceArray
    |> DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(
         state,
       );
  let state =
    disposedDirectionLightArray
    |> DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(
         state,
       );
  let state =
    disposedPointLightArray
    |> DisposeComponentGameObjectMainService.batchDisposePointLightComponent(
         state,
       );
  let state =
    disposedMeshRendererComponentArray
    |> DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
         state,
       );
  (
    state,
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  );
};

let _disposeGameObjects =
    (
      batchDisposeBasicMaterialComponentFunc,
      batchDisposeLightMaterialComponentFunc,
      {gameObjectRecord} as state,
    ) => {
  let {disposedUidArray, disposedUidArrayForKeepOrder} = gameObjectRecord;
  let (
    state,
    geometryNeedDisposeVboBufferArrForNotKeepOrder,
    sourceInstanceNeedDisposeVboBufferArrForNotKeepOrder,
  ) =
    state
    |> DisposeGameObjectMainService.batchDispose(
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         ),
         disposedUidArray,
         false,
       );
  let (
    state,
    geometryNeedDisposeVboBufferArrForKeepOrder,
    sourceInstanceNeedDisposeVboBufferArrForKeepOrder,
  ) =
    state
    |> DisposeGameObjectMainService.batchDispose(
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         ),
         disposedUidArrayForKeepOrder,
         true,
       );
  let state = state |> DisposeGameObjectMainService.clearDeferDisposeData;
  (
    state,
    geometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(geometryNeedDisposeVboBufferArrForKeepOrder),
    sourceInstanceNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(sourceInstanceNeedDisposeVboBufferArrForKeepOrder),
  );
};

let execJob =
    (
      batchDisposeBasicMaterialComponentFunc,
      batchDisposeLightMaterialComponentFunc,
      state,
    ) => {
  let (
    state,
    geometryNeedDisposeVboBufferArrFromComponent,
    sourceInstanceNeedDisposeVboBufferArrFromComponent,
  ) =
    state
    |> _disposeComponents(
         batchDisposeBasicMaterialComponentFunc,
         batchDisposeLightMaterialComponentFunc,
       );
  let (
    state,
    geometryNeedDisposeVboBufferArrFromGameObject,
    sourceInstanceNeedDisposeVboBufferArrFromGameObject,
  ) =
    state
    |> _disposeGameObjects(
         batchDisposeBasicMaterialComponentFunc,
         batchDisposeLightMaterialComponentFunc,
       );
  (
    state,
    geometryNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(geometryNeedDisposeVboBufferArrFromGameObject),
    sourceInstanceNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(sourceInstanceNeedDisposeVboBufferArrFromGameObject),
  );
};