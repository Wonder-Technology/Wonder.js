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

let _cloneComponentExceptTransform =
    (
      (uid, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {gameObjectRecord} as state
    ) =>
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
         BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddMeshRendererComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddBoxGeometryComponentForClone
       )
     )
  |> _clone(
       (
         uid,
         [@bs] GetComponentGameObjectService.getCustomGeometryComponent(uid, gameObjectRecord),
         countRangeArr,
         clonedGameObjectArr
       ),
       (
         CloneComponentGameObjectMainService.cloneCustomGeometryComponent,
         BatchAddGameObjectComponentMainService.batchAddCustomGeometryComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone(
           isShareMaterial
         )
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
         BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForClone(
           isShareMaterial
         )
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
         BatchAddGameObjectComponentMainService.batchAddAmbientLightComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddDirectionLightComponentForClone
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
         BatchAddGameObjectComponentMainService.batchAddPointLightComponentForClone
       )
     );

let clone =
    (
      (uid, transform, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {basicCameraViewRecord, perspectiveCameraProjectionRecord, transformRecord, gameObjectRecord} as state
    ) => {
  let (state, clonedTransformArr) =
    state
    |> _cloneComponentExceptTransform((uid, countRangeArr, clonedGameObjectArr), isShareMaterial)
    |> CloneComponentGameObjectMainService.cloneTransformComponent(transform, countRangeArr);
  (
    state
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr
       ),
    clonedTransformArr
  )
};