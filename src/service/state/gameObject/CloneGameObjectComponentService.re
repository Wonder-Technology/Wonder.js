open StateDataType;

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
         CloneComponentGameObjectService.cloneBasicCameraViewComponent,
         AddGameObjectComponentService.batchAddBasicCameraViewComponentForClone
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
         CloneComponentGameObjectService.clonePerspectiveCameraProjectionComponent,
         AddGameObjectComponentService.batchAddPerspectiveCameraProjectionComponentForClone
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
         CloneComponentGameObjectService.cloneMeshRendererComponent,
         AddGameObjectComponentService.batchAddMeshRendererComponentForClone
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
         CloneComponentGameObjectService.cloneBoxGeometryComponent,
         AddGameObjectComponentService.batchAddBoxGeometryComponentForClone
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
         CloneComponentGameObjectService.cloneBasicMaterialComponent(isShareMaterial),
         AddGameObjectComponentService.batchAddBasicMaterialComponentForClone(isShareMaterial)
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
         CloneComponentGameObjectService.cloneLightMaterialComponent(isShareMaterial),
         AddGameObjectComponentService.batchAddLightMaterialComponentForClone(isShareMaterial)
       )
     );