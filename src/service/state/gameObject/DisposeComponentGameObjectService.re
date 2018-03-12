open StateDataType;

open GameObjectType;

open ComponentType;

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
        DisposePerspectiveCameraProjectionService.handleDisposeComponent(
          component,
          perspectiveCameraProjectionRecord
        )
    }
  );

let disposeMeshRendererComponent =
  [@bs]
  (
    (uid: int, component: component, {meshRendererRecord} as state) => {
      ...state,
      meshRendererRecord:
        DisposeMeshRendererService.handleDisposeComponent(component, uid, meshRendererRecord)
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

let disposeBoxGeometryComponent =
  [@bs]
  (
    (uid: int, component: component, {memoryConfig} as state) =>
      DisposeGeometryService.handleDisposeComponent(
        component,
        ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
        state
      )
  );

let disposePerspectiveCameraProjectionComponent =
  [@bs]
  (
    (uid: int, component: component, {perspectiveCameraProjectionRecord} as state) => {
      ...state,
      perspectiveCameraProjectionRecord:
        DisposePerspectiveCameraProjectionService.handleDisposeComponent(
          component,
          perspectiveCameraProjectionRecord
        )
    }
  );

let disposeBasicMaterialComponent =
  [@bs]
  (
    (uid: int, component: component, {basicMaterialRecord} as state) => {
      ...state,
      basicMaterialRecord:
        DisposeBasicMaterialService.handleDisposeComponent(component, basicMaterialRecord)
    }
  );

let disposeLightMaterialComponent =
  [@bs]
  (
    (uid: int, component: component, {lightMaterialRecord} as state) => {
      ...state,
      lightMaterialRecord:
        DisposeLightMaterialService.handleDisposeComponent(component, lightMaterialRecord)
    }
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

let batchDisposeMeshRendererComponent =
    (uidMap, {meshRendererRecord} as state, componentArray: array(component)) => {
  ...state,
  meshRendererRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      meshRendererRecord,
      DisposeMeshRendererService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeTransformComponent =
    (uidMap, {memoryConfig} as state, componentArray: array(component)) =>
  [@bs]
  DisposeTransformService.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
    state
  );

let batchDisposeBoxGeometryComponent =
    (uidMap, {memoryConfig} as state, componentArray: array(component)) =>
  [@bs]
  DisposeGeometryService.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    ConfigMemoryService.getMaxTypeArrayPoolSize(memoryConfig),
    state
  );

let batchDisposeBasicMaterialComponent =
    (uidMap, {basicMaterialRecord} as state, componentArray: array(component)) => {
  ...state,
  basicMaterialRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      basicMaterialRecord,
      DisposeBasicMaterialService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeLightMaterialComponent =
    (uidMap, {lightMaterialRecord} as state, componentArray: array(component)) => {
  ...state,
  lightMaterialRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      lightMaterialRecord,
      DisposeLightMaterialService.handleBatchDisposeComponent,
      componentArray
    )
};