open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _getSharableComponentDataArr =
    (uidArray, getComponentFunc, gameObjectRecord) =>
  uidArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. dataMap, uid) =>
         switch (getComponentFunc(. uid, gameObjectRecord)) {
         | None => dataMap
         | Some(component) =>
           dataMap |> ArrayMapService.addValue(component, uid)
         /* dataArr |> ArrayService.push((uid, component)) */
         },
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );

let _batchDisposeSharableComponents =
    (
      uidArray,
      (isRemoveGeometry, isRemoveMaterial, isRemoveTexture),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
      ),
      {gameObjectRecord} as state,
    ) => {
  let geometryDataMap =
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
          geometryDataMap,
        ),
        [||],
      ) :
      DisposeComponentGameObjectMainService.batchDisposeGeometryComponentData(
        state,
        geometryDataMap,
      );

  let basicMaterialDataMap =
    _getSharableComponentDataArr(
      uidArray,
      GetComponentGameObjectService.getBasicMaterialComponent,
      gameObjectRecord,
    );

  let {gameObjectRecord} as state =
    isRemoveMaterial ?
      RemoveComponentGameObjectMainService.batchRemoveBasicMaterialComponent(
        state,
        basicMaterialDataMap,
      ) :
      batchDisposeBasicMaterialComponentFunc(
        state,
        basicMaterialDataMap,
        isRemoveTexture,
      );

  let lightMaterialDataMap =
    _getSharableComponentDataArr(
      uidArray,
      GetComponentGameObjectService.getLightMaterialComponent,
      gameObjectRecord,
    );

  let state =
    isRemoveMaterial ?
      RemoveComponentGameObjectMainService.batchRemoveLightMaterialComponent(
        state,
        lightMaterialDataMap,
      ) :
      batchDisposeLightMaterialComponentFunc(
        state,
        lightMaterialDataMap,
        isRemoveTexture,
      );

  (state, geometryNeedDisposeVboBufferArr);
};

let batchDispose =
    (
      (
        uidArray: array(int),
        isKeepOrder,
        isRemoveGeometry,
        isRemoveMaterial,
        isRemoveTexture,
      ),
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
      (isRemoveGeometry, isRemoveMaterial, isRemoveTexture),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
      ),
      state,
    );

  let state =
    state
    |> BatchGetComponentGameObjectMainService.batchGetScriptComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeScriptComponent(
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
    |> BatchGetComponentGameObjectMainService.batchGetFlyCameraControllerComponent(
         uidArray,
       )
    |> DisposeComponentGameObjectMainService.batchDisposeFlyCameraControllerComponent(
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
         (isKeepOrder, isRemoveGeometry, isRemoveMaterial, isRemoveTexture),
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
