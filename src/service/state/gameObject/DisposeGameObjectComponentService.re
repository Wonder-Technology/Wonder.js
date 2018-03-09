open GameObjectType;

open ComponentType;

let _dispose =
    (
      uid,
      (getComponentFunc, disposeComponentFunc),
      (componentRecord, gameObjectRecord) as recordTuple
    ) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, componentRecord)
  | None => componentRecord
  };

let dispose = (uid, (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord)) => (
  (basicCameraViewRecord, gameObjectRecord)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicCameraViewComponent,
         DisposeComponentGameObjectService.disposeBasicCameraViewComponent
       )
     ),
  (perspectiveCameraProjectionRecord, gameObjectRecord)
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
         DisposeComponentGameObjectService.disposePerspectiveCameraProjectionComponent
       )
     ),
  gameObjectRecord
);

let batchDispose =
    (
      uidArray: array(int),
      disposedUidMap,
      /* batchDisposeFunc, */
      (basicCameraViewRecord, perspectiveCameraProjectionRecord, gameObjectRecord)
    ) => (
  gameObjectRecord
  |> GetComponentGameObjectService.batchGetBasicCameraViewComponent(uidArray)
  |> DisposeComponentGameObjectService.batchDisposeBasicCameraViewComponent(
       disposedUidMap,
       basicCameraViewRecord
     ),
  gameObjectRecord
  |> GetComponentGameObjectService.batchGetPerspectiveCameraProjectionComponent(uidArray)
  |> DisposeComponentGameObjectService.batchDisposePerspectiveCameraProjectionComponent(
       disposedUidMap,
       perspectiveCameraProjectionRecord
     ),
  gameObjectRecord
);