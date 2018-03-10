open GameObjectType;

open StateDataType;

open ComponentType;

open DisposeComponentGameObjectService;

open BatchGetComponentGameObjectService;

/* let _dispose =
     (
       uid,
       (getComponentFunc, disposeComponentFunc),
       (componentRecord, gameObjectRecord) as recordTuple
     ) =>
   switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
   | Some(component) => [@bs] disposeComponentFunc(uid, component, componentRecord)
   | None => componentRecord
   }; */
let _dispose = (uid, (getComponentFunc, disposeComponentFunc), {gameObjectRecord} as state) =>
  switch ([@bs] getComponentFunc(uid, gameObjectRecord)) {
  | Some(component) => [@bs] disposeComponentFunc(uid, component, state)
  | None => state
  };

/* let disposeTransformComponent =
   [@bs]
   (
     (uid: int, component: component, {memoryConfig, typeArrayPoolRecord, componentRecord} as state) =>
       DisposeTransformService.handleDisposeComponent(
         component,
         ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
         state
       )
   ); */
let dispose =
    (
      uid,
      /* (
           basicCameraViewRecord,
           perspectiveCameraProjectionRecord,
           memoryConfig,
           typeArrayPoolRecord,
           transformRecord,
           gameObjectRecord
         ) */
      /* {gameObjectRecord} as state */
      state
    ) =>
  /* let {
       basicCameraViewRecord,
       perspectiveCameraProjectionRecord,
       memoryConfig,
       typeArrayPoolRecord,
       transformRecord,
       gameObjectRecord
     } as state = */
  state
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getTransformComponent,
         DisposeComponentGameObjectService.disposeTransformComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getBasicCameraViewComponent,
         DisposeComponentGameObjectService.disposeBasicCameraViewComponent
       )
     )
  |> _dispose(
       uid,
       (
         GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
         DisposeComponentGameObjectService.disposePerspectiveCameraProjectionComponent
       )
     );

/* {
     ...state,
     basicCameraViewRecord:
       (basicCameraViewRecord, gameObjectRecord)
       |> _dispose(
            uid,
            (
              GetComponentGameObjectService.getBasicCameraViewComponent,
              DisposeComponentGameObjectService.disposeBasicCameraViewComponent
            )
          ),
     perspectiveCameraProjectionRecord:
       (perspectiveCameraProjectionRecord, gameObjectRecord)
       |> _dispose(
            uid,
            (
              GetComponentGameObjectService.getPerspectiveCameraProjectionComponent,
              DisposeComponentGameObjectService.disposePerspectiveCameraProjectionComponent
            )
          )
   } */
/* (
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
     ((memoryConfig, typeArrayPoolRecord, transformRecord), gameObjectRecord)
     |> _dispose(
          uid,
          (GetComponentGameObjectService.getTransformComponent, disposeTransformComponent)
        ),
     gameObjectRecord
   ); */
let batchDispose =
    (
      uidArray: array(int),
      disposedUidMap,
      /* batchDisposeFunc, */
      /* (
           basicCameraViewRecord,
           perspectiveCameraProjectionRecord,
           memoryConfig,
           typeArrayPoolRecord,
           transformRecord,
           gameObjectRecord
         ) */
      state
    ) =>
  /* let {
       basicCameraViewRecord,
       perspectiveCameraProjectionRecord,
       memoryConfig,
       typeArrayPoolRecord,
       transformRecord,
       gameObjectRecord
     } as state = */
  state
  |> BatchGetComponentGameObjectService.batchGetTransformComponent(uidArray)
  |> batchDisposeTransformComponent(disposedUidMap, state)
  |> BatchGetComponentGameObjectService.batchGetTransformComponent(uidArray)
  |> batchDisposeTransformComponent(disposedUidMap, state)
  |> BatchGetComponentGameObjectService.batchGetBasicCameraViewComponent(uidArray)
  |> DisposeComponentGameObjectService.batchDisposeBasicCameraViewComponent(disposedUidMap, state)
  |> BatchGetComponentGameObjectService.batchGetPerspectiveCameraProjectionComponent(uidArray)
  |> DisposeComponentGameObjectService.batchDisposePerspectiveCameraProjectionComponent(
       disposedUidMap,
       state
     );
/* {
     ...state,
     basicCameraViewRecord:
       gameObjectRecord
       |> GetComponentGameObjectService.batchGetBasicCameraViewComponent(uidArray)
       |> DisposeComponentGameObjectService.batchDisposeBasicCameraViewComponent(
            disposedUidMap,
            basicCameraViewRecord
          ),
     perspectiveCameraProjectionRecord:
       gameObjectRecord
       |> GetComponentGameObjectService.batchGetPerspectiveCameraProjectionComponent(uidArray)
       |> DisposeComponentGameObjectService.batchDisposePerspectiveCameraProjectionComponent(
            disposedUidMap,
            perspectiveCameraProjectionRecord
          )
   } */
/* (
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
     |> GetComponentGameObjectService.batchGetTransformComponent(uidArray)
     |> batchDisposeTransformComponent(
          disposedUidMap,
          (memoryConfig, typeArrayPoolRecord, transformRecord)
        ),
     gameObjectRecord
   ); */