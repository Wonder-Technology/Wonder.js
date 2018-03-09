open GameObjectType;

open ComponentType;

let _clone =
    (
      (uid, component: option(int), countRangeArr, clonedGameObjectArr: array(int)),
      (cloneComponentFunc, batchAddComponentFunc),
      (componentRecord, gameObjectRecord) as recordTuple
    ) =>
  switch component {
  | Some(component) =>
    let (componentRecord, clonedComponentArr) =
      cloneComponentFunc(component, countRangeArr, componentRecord);
    batchAddComponentFunc(
      clonedGameObjectArr,
      clonedComponentArr,
      (componentRecord, gameObjectRecord)
    )
  | None => recordTuple
  };

let clone =
    (
      (uid, transform, countRangeArr, clonedGameObjectArr: array(int)),
      isShareMaterial,
      (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord)
    ) => {
  let (basicCameraViewRecord, gameObjectRecord) =
    (basicCameraViewRecord, gameObjectRecord)
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
       );
  let (perspectiveCameraProjectionRecord, gameObjectRecord) =
    (perspectiveCameraProjectionRecord, gameObjectRecord)
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
       );
  (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord)
};