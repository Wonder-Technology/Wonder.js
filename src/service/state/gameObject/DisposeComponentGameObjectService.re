open StateDataType;

open GameObjectType;

open ComponentType;

/* let isAlive = (uid: int, {transformMap, disposedUidMap}) =>
     disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
       false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false;

   let disposeBasicCameraViewComponent =
     [@bs]
     (
       (uid: int, component: component, record) =>
         DisposeBasicCameraViewService.handleDisposeComponent(component, record)
     );

   let disposePerspectiveCameraProjectionComponent =
     [@bs]
     (
       (uid: int, component: component, record) =>
         DisposePerspectiveCameraProjectionService.handleDisposeComponent(component, record)
     );

   let batchDisposeBasicCameraViewComponent =
       (uidMap, componentRecord, componentArray: array(component)) =>
     ComponentMapService.batchDisposeComponent(
       uidMap,
       componentRecord,
       DisposeBasicCameraViewService.handleBatchDisposeComponent,
       componentArray
     );

   let batchDisposePerspectiveCameraProjectionComponent =
       (uidMap, componentRecord, componentArray: array(component)) =>
     ComponentMapService.batchDisposeComponent(
       uidMap,
       componentRecord,
       DisposePerspectiveCameraProjectionService.handleBatchDisposeComponent,
       componentArray
     ); */
let isAlive = (uid: int, {gameObjectRecord}) => {
  let {transformMap, disposedUidMap} = gameObjectRecord;
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false
};

let disposeBasicCameraViewComponent =
  [@bs]
  (
    (uid: int, component: component, {basicCameraViewRecord} as state) => {
      ...state,
      basicCameraViewRecord:
        DisposeBasicCameraViewService.handleDisposeComponent(component, basicCameraViewRecord)
    }
  );

let disposePerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, component: component, {perspectiveCameraProjectionRecord} as state) => {
      ...state,
      perspectiveCameraProjectionRecord:
        DisposePerspectiveCameraProjectionService.handleDisposeComponent(component, perspectiveCameraProjectionRecord)
    }
  );

let disposeTransformComponent =
  [@bs]
  (
    (uid: int, component: component, {memoryConfig} as state) =>
      DisposeTransformService.handleDisposeComponent(
        component,
        ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
        state
      )
  );

let batchDisposeBasicCameraViewComponent =
    (uidMap, {basicCameraViewRecord} as state, componentArray: array(component)) => {
  ...state,
  basicCameraViewRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      basicCameraViewRecord,
      DisposeBasicCameraViewService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposePerspectiveCameraProjectionComponent =
    (uidMap, {perspectiveCameraProjectionRecord} as state, componentArray: array(component)) => {
  ...state,
  perspectiveCameraProjectionRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      perspectiveCameraProjectionRecord,
      DisposePerspectiveCameraProjectionService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeTransformComponent =
    (
      uidMap,
      /* (memoryConfig, typeArrayPoolRecord, componentRecord), */
      {memoryConfig} as state,
      componentArray: array(component)
    ) =>
  [@bs]
  DisposeTransformService.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
    state
  );