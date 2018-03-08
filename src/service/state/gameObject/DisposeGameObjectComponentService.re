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
         GameObjectGetComponentService.getBasicCameraViewComponent,
         GameObjectDisposeComponentService.disposeBasicCameraViewComponent
       )
     ),
  (perspectiveCameraProjectionRecord, gameObjectRecord)
  |> _dispose(
       uid,
       (
         GameObjectGetComponentService.getPerspectiveCameraProjectionComponent,
         GameObjectDisposeComponentService.disposePerspectiveCameraProjectionComponent
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
  |> GameObjectGetComponentService.batchGetBasicCameraViewComponent(uidArray)
  |> GameObjectDisposeComponentService.batchDisposeBasicCameraViewComponent(
       disposedUidMap,
       basicCameraViewRecord
     ),
  gameObjectRecord
  |> GameObjectGetComponentService.batchGetPerspectiveCameraProjectionComponent(uidArray)
  |> GameObjectDisposeComponentService.batchDisposePerspectiveCameraProjectionComponent(
       disposedUidMap,
       perspectiveCameraProjectionRecord
     ),
  gameObjectRecord
);