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
    disposedFlyCameraControllerArray,
    disposedArcballCameraControllerArray,
    disposedBasicMaterialDataMap,
    disposedLightMaterialDataMap,
    disposedGeometryDataMap,
    disposedSourceInstanceArray,
    disposedObjectInstanceArray,
    disposedDirectionLightArray,
    disposedPointLightArray,
    disposedMeshRendererComponentArray,
    disposedScriptArray,
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
    disposedFlyCameraControllerArray
    |> DisposeComponentGameObjectMainService.batchDisposeFlyCameraControllerComponent(
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
    disposedBasicMaterialDataMap
    |> batchDisposeBasicMaterialComponentFunc(state);
  let state =
    disposedLightMaterialDataMap
    |> batchDisposeLightMaterialComponentFunc(state);
  let (state, geometryNeedDisposeVboBufferArr) =
    disposedGeometryDataMap
    |> DisposeComponentGameObjectMainService.batchDisposeGeometryComponentData(
         state,
       );
  let (state, sourceInstanceNeedDisposeVboBufferArr) =
    disposedSourceInstanceArray
    |> DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
         state,
         (false, false, false),
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

  let state =
    disposedScriptArray
    |> DisposeComponentGameObjectMainService.batchDisposeScriptComponent(
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
  let {
    disposedUidArray,
    disposedUidArrayForKeepOrder,
    disposedUidArrayForKeepOrderRemoveGeometry,
    disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
    disposedUidArrayForDisposeGeometryRemoveMaterial,
  } = gameObjectRecord;

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
         (false, false, false),
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
         (true, false, false),
       );
  let (
    state,
    geometryNeedDisposeVboBufferArrForKeepOrderRemoveGeometry,
    sourceInstanceNeedDisposeVboBufferArrForKeepOrderRemoveGeometry,
  ) =
    state
    |> DisposeGameObjectMainService.batchDispose(
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         ),
         disposedUidArrayForKeepOrderRemoveGeometry,
         (true, true, false),
       );
  let (
    state,
    geometryNeedDisposeVboBufferArrForKeepOrderRemoveGeometryRemoveMaterial,
    sourceInstanceNeedDisposeVboBufferArrForKeepOrderRemoveGeometryRemoveMaterial,
  ) =
    state
    |> DisposeGameObjectMainService.batchDispose(
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         ),
         disposedUidArrayForKeepOrderRemoveGeometryRemoveMaterial,
         (true, true, true),
       );
  let (
    state,
    geometryNeedDisposeVboBufferArrForDisposeGeometryRemoveMaterial,
    sourceInstanceNeedDisposeVboBufferArrForDisposeGeometryRemoveMaterial,
  ) =
    state
    |> DisposeGameObjectMainService.batchDispose(
         (
           batchDisposeBasicMaterialComponentFunc,
           batchDisposeLightMaterialComponentFunc,
         ),
         disposedUidArrayForDisposeGeometryRemoveMaterial,
         (false, false, true),
       );

  let state = state |> DisposeGameObjectMainService.clearDeferDisposeData;

  (
    state,
    geometryNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concatMany([|
         geometryNeedDisposeVboBufferArrForKeepOrder,
         geometryNeedDisposeVboBufferArrForKeepOrderRemoveGeometry,
         geometryNeedDisposeVboBufferArrForKeepOrderRemoveGeometryRemoveMaterial,
         geometryNeedDisposeVboBufferArrForDisposeGeometryRemoveMaterial,
       |]),
    sourceInstanceNeedDisposeVboBufferArrForNotKeepOrder
    |> Js.Array.concatMany([|
         sourceInstanceNeedDisposeVboBufferArrForKeepOrder,
         sourceInstanceNeedDisposeVboBufferArrForKeepOrderRemoveGeometry,
         sourceInstanceNeedDisposeVboBufferArrForKeepOrderRemoveGeometryRemoveMaterial,
         sourceInstanceNeedDisposeVboBufferArrForDisposeGeometryRemoveMaterial,
       |]),
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