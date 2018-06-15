open StateDataMainType;

open StateDataMainType;

open ComponentType;

let _clone =
    (
      (uid, component: option(int), countRangeArr, clonedGameObjectArr: array(int)),
      (cloneComponentFunc, batchAddComponentFunc),
      state
    ) =>
  switch component {
  | Some(component) =>
    let (state, clonedComponentArr) =
      cloneComponentFunc(component, countRangeArr, state);
    batchAddComponentFunc(clonedGameObjectArr, clonedComponentArr, state)
  | None => state
  };

let _cloneGeometryComponent =
    (uid, countRangeArr, clonedGameObjectArr: array(int), {gameObjectRecord} as state) => {
  let boxGeometryType = CurrentComponentDataMapService.getBoxGeometryType();
  let customGeometryType = CurrentComponentDataMapService.getCustomGeometryType();
  switch ([@bs] GetComponentGameObjectService.getGeometryComponentData(uid, gameObjectRecord)) {
  | Some((component, type_)) =>
    switch type_ {
    | type_ when type_ === boxGeometryType =>
      let (componentRecord, clonedComponentArr) =
        CloneComponentGameObjectMainService.cloneBoxGeometryComponent(
          component,
          countRangeArr,
          state
        );
      BatchAddGameObjectComponentMainService.batchAddBoxGeometryComponentForClone(
        clonedGameObjectArr,
        clonedComponentArr,
        state
      )
    | type_ when type_ === customGeometryType =>
      let (componentRecord, clonedComponentArr) =
        CloneComponentGameObjectMainService.cloneCustomGeometryComponent(
          component,
          countRangeArr,
          state
        );
      BatchAddGameObjectComponentMainService.batchAddCustomGeometryComponentForClone(
        clonedGameObjectArr,
        clonedComponentArr,
        state
      )
    }
  | None => state
  }
};

let _cloneComponentExceptTransform =
    (
      (uid, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      {gameObjectRecord} as state
    ) =>
  state
  |> _cloneGeometryComponent(uid, countRangeArr, clonedGameObjectArr)
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
         [@bs] GetComponentGameObjectService.getBasicMaterialComponent(uid, gameObjectRecord),
         countRangeArr,
         clonedGameObjectArr
       ),
       (
         CloneComponentGameObjectMainService.cloneBasicMaterialComponent(isShareMaterial)
         
         ,
         /* BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone(
           isShareMaterial
         ) */
         BatchAddGameObjectComponentMainService.batchAddBasicMaterialComponentForClone
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
         /* BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForClone(
           isShareMaterial
         ) */
         BatchAddGameObjectComponentMainService.batchAddLightMaterialComponentForClone
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