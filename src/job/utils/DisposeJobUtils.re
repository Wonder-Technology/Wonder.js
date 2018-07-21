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
    disposedBoxGeometryArray,
    disposedCustomGeometryArray,
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
  let (state, boxGeometryNeedDisposeVboBufferArr) =
    disposedBoxGeometryArray
    |> DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(
         state,
       );
  let (state, customGeometryNeedDisposeVboBufferArr) =
    disposedCustomGeometryArray
    |> DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(
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
    boxGeometryNeedDisposeVboBufferArr,
    customGeometryNeedDisposeVboBufferArr,
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
    boxGeometryNeedDisposeVboBufferArrForNotKeepOrder,
    customGeometryNeedDisposeVboBufferArrForNotKeepOrder,
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
    boxGeometryNeedDisposeVboBufferArrForKeepOrder,
    customGeometryNeedDisposeVboBufferArrForKeepOrder,
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
    boxGeometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrForKeepOrder),
    customGeometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concat(customGeometryNeedDisposeVboBufferArrForKeepOrder),
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
    boxGeometryNeedDisposeVboBufferArrFromComponent,
    customGeometryNeedDisposeVboBufferArrFromComponent,
    sourceInstanceNeedDisposeVboBufferArrFromComponent,
  ) =
    state
    |> _disposeComponents(
         batchDisposeBasicMaterialComponentFunc,
         batchDisposeLightMaterialComponentFunc,
       );
  let (
    state,
    boxGeometryNeedDisposeVboBufferArrFromGameObject,
    customGeometryNeedDisposeVboBufferArrFromGameObject,
    sourceInstanceNeedDisposeVboBufferArrFromGameObject,
  ) =
    state
    |> _disposeGameObjects(
         batchDisposeBasicMaterialComponentFunc,
         batchDisposeLightMaterialComponentFunc,
       );
  (
    state,
    boxGeometryNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(boxGeometryNeedDisposeVboBufferArrFromGameObject),
    customGeometryNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(customGeometryNeedDisposeVboBufferArrFromGameObject),
    sourceInstanceNeedDisposeVboBufferArrFromComponent
    |> Js.Array.concat(sourceInstanceNeedDisposeVboBufferArrFromGameObject),
  );
};