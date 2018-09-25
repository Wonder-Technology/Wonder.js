open StateDataMainType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open BatchGetComponentGameObjectMainService;

let _batchDisposeSharableComponents =
    (
      uidArray,
      (isRemoveGeometry, isRemoveMaterial),
      (
        batchDisposeBasicMaterialComponentFunc,
        batchDisposeLightMaterialComponentFunc,
      ),
      state,
    ) => {
  let geometryDataArr =
    state
    |> BatchGetComponentGameObjectMainService.batchGetGeometryComponent(
         uidArray,
       )
    |> Js.Array.mapi((geometry, index) =>
         (Array.unsafe_get(uidArray, index), geometry)
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
      DisposeComponentGameObjectMainService.batchDisposeGeometryComponent(
        state,
        geometryDataArr,
      );

  let basicMaterialDataArr =
    state
    |> BatchGetComponentGameObjectMainService.batchGetBasicMaterialComponent(
         uidArray,
       )
    |> Js.Array.mapi((basicMaterial, index) =>
         (Array.unsafe_get(uidArray, index), basicMaterial)
       );

  let state =
    isRemoveMaterial ?
      RemoveComponentGameObjectMainService.batchRemoveBasicMaterialComponent(
        state,
        basicMaterialDataArr,
      ) :
      batchDisposeBasicMaterialComponentFunc(state, basicMaterialDataArr);

  let lightMaterialDataArr =
    state
    |> BatchGetComponentGameObjectMainService.batchGetLightMaterialComponent(
         uidArray,
       )
    |> Js.Array.mapi((lightMaterial, index) =>
         (Array.unsafe_get(uidArray, index), lightMaterial)
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