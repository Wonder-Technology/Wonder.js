open StateDataMainType;

open StateDataMainType;

open ComponentType;

let _clone =
    (
      (
        uid,
        component: option(int),
        countRangeArr,
        clonedGameObjectArr: array(int),
      ),
      (cloneComponentFunc, batchAddComponentFunc),
      state,
    ) =>
  switch (component) {
  | Some(component) =>
    let (state, clonedComponentArr) =
      cloneComponentFunc(component, countRangeArr, state);
    batchAddComponentFunc(clonedGameObjectArr, clonedComponentArr, state);
  | None => state
  };

let _cloneComponentExceptTransform =
    (
      (uid, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {gameObjectRecord} as state,
    ) =>
  state
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getGeometryComponent(
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneGeometryComponent,
         BatchAddGameObjectComponentMainService.batchAddGeometryComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getBasicCameraViewComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneBasicCameraViewComponent,
         BatchAddGameObjectComponentMainService.batchAddBasicCameraViewComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.clonePerspectiveCameraProjectionComponent,
         BatchAddGameObjectComponentMainService.batchAddPerspectiveCameraProjectionComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getArcballCameraControllerComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneArcballCameraControllerComponent,
         BatchAddGameObjectComponentMainService.batchAddArcballCameraControllerComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getBasicMaterialComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneBasicMaterialComponent(
           isShareMaterial,
         ),
         /* BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone(
              isShareMaterial
            ) */
         BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getLightMaterialComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneLightMaterialComponent(
           isShareMaterial,
         ),
         /* BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForClone(
              isShareMaterial
            ) */
         BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getMeshRendererComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneMeshRendererComponent,
         BatchAddGameObjectComponentMainService.batchAddMeshRendererComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getDirectionLightComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.cloneDirectionLightComponent,
         BatchAddGameObjectComponentMainService.batchAddDirectionLightComponentForClone,
       ),
     )
  |> _clone(
       (
         uid,
         GetComponentGameObjectService.getPointLightComponent(.
           uid,
           gameObjectRecord,
         ),
         countRangeArr,
         clonedGameObjectArr,
       ),
       (
         CloneComponentGameObjectMainService.clonePointLightComponent,
         BatchAddGameObjectComponentMainService.batchAddPointLightComponentForClone,
       ),
     );

let clone =
    (
      (uid, transform, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {
        basicCameraViewRecord,
        perspectiveCameraProjectionRecord,
        transformRecord,
        gameObjectRecord,
      } as state,
    ) => {
  let (state, clonedTransformArr) =
    state
    |> _cloneComponentExceptTransform(
         (uid, countRangeArr, clonedGameObjectArr),
         isShareMaterial,
       )
    |> CloneComponentGameObjectMainService.cloneTransformComponent(
         transform,
         countRangeArr,
       );
  (
    state
    |> BatchAddGameObjectComponentMainService.batchAddTransformComponentForClone(
         clonedGameObjectArr,
         clonedTransformArr,
       ),
    clonedTransformArr,
  );
};