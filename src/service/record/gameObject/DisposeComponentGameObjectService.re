open GameObjectType;

open ComponentType;

let isAlive = (uid: int, {transformMap, disposedUidMap}) =>
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false;

let disposeBasicCameraViewComponent =
  [@bs]
  (
    (uid: int, component: component, basicCameraViewRecord) =>
      DisposeBasicCameraViewService.handleDisposeComponent(
        component,
        basicCameraViewRecord
      )
  );

let disposePerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, component: component, perspectiveCameraProjectionRecord) =>
      DisposePerspectiveCameraProjectionService.handleDisposeComponent(
        component,
        perspectiveCameraProjectionRecord
      )
  );

let _batchDisposeComponent = (uidMap, componentRecord, handleFunc, componentArray) =>
  [@bs] handleFunc(componentArray, uidMap, componentRecord);

let batchDisposeBasicCameraViewComponent =
    (uidMap, componentRecord, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    componentRecord,
    DisposeBasicCameraViewService.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposePerspectiveCameraProjectionComponent =
    (uidMap, componentRecord, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    componentRecord,
    DisposePerspectiveCameraProjectionService.handleBatchDisposeComponent,
    componentArray
  );