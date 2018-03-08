open GameObjectType;

open ComponentType;

let isAlive = (uid: int, {transformMap, disposedUidMap}) =>
  disposedUidMap |> WonderCommonlib.SparseMapSystem.has(uid) ?
    false : transformMap |> WonderCommonlib.SparseMapSystem.has(uid) ? true : false;

let disposeBasicCameraViewComponent =
  [@bs]
  (
    (uid: int, component: component, basicCameraViewRecord) =>
      BasicCameraViewDisposeComponentService.handleDisposeComponent(
        component,
        basicCameraViewRecord
      )
  );

let disposePerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, component: component, perspectiveCameraProjectionRecord) =>
      PerspectiveCameraProjectionDisposeComponentService.handleDisposeComponent(
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
    BasicCameraViewDisposeComponentService.handleBatchDisposeComponent,
    componentArray
  );

let batchDisposePerspectiveCameraProjectionComponent =
    (uidMap, componentRecord, componentArray: array(component)) =>
  _batchDisposeComponent(
    uidMap,
    componentRecord,
    PerspectiveCameraProjectionDisposeComponentService.handleBatchDisposeComponent,
    componentArray
  );