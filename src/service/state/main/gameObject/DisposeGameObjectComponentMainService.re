open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _getSharableComponentDataArr =
    (uidArray, getComponentFunc, gameObjectRecord) =>
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. dataArr, uid) =>
         switch (getComponentFunc(. uid, gameObjectRecord)) {
         | None => dataArr
         | Some(component) => dataArr |> ArrayService.push((uid, component))
         },
       [||],
     );

let _batchDisposeSharableComponents =
    (
      uidArray,
      (isRemoveGeometry, isRemoveMaterial),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
      ),
      {gameObjectRecord} as state,
    ) => {
  let geometryDataArr =
    _getSharableComponentDataArr(
      uidArray,
      GetComponentGameObjectService.getGeometryComponent,
      gameObjectRecord,
    );

  let (state, geometryNeedDisposeVboBufferArr) =
    isRemoveGeometry ?
      (
        RemoveComponentGameObjectMainService.batchRemoveGeometryComponent(
          state,
          geometryDataArr,
        ),
        [||],
      ) :
      DisposeComponentGameObjectMainService.batchDisposeGeometryComponentData(
        state,
        geometryDataArr,
      );

  let basicMaterialDataArr =
    _getSharableComponentDataArr(
      uidArray,
      GetComponentGameObjectService.getBasicMaterialComponent,
      gameObjectRecord,
    );

  let {gameObjectRecord} as state =
    isRemoveMaterial ?
      RemoveComponentGameObjectMainService.batchRemoveBasicMaterialComponent(
        state,
        basicMaterialDataArr,
      ) :
      batchDisposeBasicMaterialComponentFunc(state, basicMaterialDataArr);

  let lightMaterialDataArr =
    _getSharableComponentDataArr(
      uidArray,
      GetComponentGameObjectService.getLightMaterialComponent,
      gameObjectRecord,
    );

  let state =
    isRemoveMaterial ?
      RemoveComponentGameObjectMainService.batchRemoveLightMaterialComponent(
        state,
        lightMaterialDataArr,
      ) :
      batchDisposeLightMaterialComponentFunc(state, lightMaterialDataArr);

  (state, geometryNeedDisposeVboBufferArr);
};

let batchDispose =
    (
      (uidArray: array(int), isKeepOrder, isRemoveGeometry, isRemoveMaterial),
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
    _batchDisposeSharableComponents(
      uidArray,
      (isRemoveGeometry, isRemoveMaterial),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
      ),
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
         (isKeepOrder, isRemoveGeometry, isRemoveMaterial),
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