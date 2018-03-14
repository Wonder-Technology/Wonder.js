open MainStateDataType;

open GameObjectType;

open ComponentType;

let _clone =
    (
      (uid, component: option(int), countRangeArr, clonedGameObjectArr: array(int)),
      (cloneComponentFunc, batchAddComponentFunc),
      state
    ) =>
  switch component {
  | Some(component) =>
    let (componentRecord, clonedComponentArr) =
      cloneComponentFunc(component, countRangeArr, state);
    batchAddComponentFunc(clonedGameObjectArr, clonedComponentArr, state)
  | None => state
  };

let clone =
    (
      (uid, transform, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state
    ) => {
  let (state, clonedTransformArr) =
    state
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getBasicCameraViewComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneBasicCameraViewComponent,
           AddGameObjectComponentMainService.batchAddBasicCameraViewComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs]
           GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(
             uid,
             gameObjectRecord
           ),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.clonePerspectiveCameraProjectionComponent,
           AddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getMeshRendererComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneMeshRendererComponent,
           AddGameObjectComponentMainService.batchAddMeshRendererComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getBoxGeometryComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneBoxGeometryComponent,
           AddGameObjectComponentMainService.batchAddBoxGeometryComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneBasicMaterialComponent(isShareMaterial),
           AddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone(isShareMaterial)
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getLightMaterialComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneLightMaterialComponent(isShareMaterial),
           AddGameObjectComponentMainService.batchAddLightMaterialComponentForClone(isShareMaterial)
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getAmbientLightComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneAmbientLightComponent,
           AddGameObjectComponentMainService.batchAddAmbientLightComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getDirectionLightComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.cloneDirectionLightComponent,
           AddGameObjectComponentMainService.batchAddDirectionLightComponentForClone
         )
       )
    |> _clone(
         (
           uid,
           [@bs] GetComponentGameObjectService.getPointLightComponent(uid, gameObjectRecord),
           countRangeArr,
           clonedGameObjectArr
         ),
         (
           CloneComponentGameObjectMainService.clonePointLightComponent,
           AddGameObjectComponentMainService.batchAddPointLightComponentForClone
         )
       )
    |> CloneComponentGameObjectMainService.cloneTransformComponent(transform, countRangeArr);
  (
    state
    |> AddGameObjectComponentMainService.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       ),
    clonedTransformArr
  )
};