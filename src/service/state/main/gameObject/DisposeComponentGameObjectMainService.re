open StateDataMainType;

open StateDataMainType;

open ComponentType;

/* let isAlive = (uid: int, {gameObjectRecord}) => {
     let {transformMap, disposedUidMap} = gameObjectRecord;
     disposedUidMap |> WonderCommonlib.SparseMapService.has(uid) ?
       false : transformMap |> WonderCommonlib.SparseMapService.has(uid) ? true : false
   }; */
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
    (uid: int, component: component, isKeepOrder, {settingRecord} as state) =>
      DisposeTransformMainService.handleDisposeComponent(
        component,
        MemorySettingService.getMaxTypeArrayPoolSize(settingRecord),
        isKeepOrder,
        state
      )
  );

let disposeBoxGeometryComponent =
  [@bs]
  (
    (uid: int, component: component, {settingRecord, gameObjectRecord} as state) =>
      /* CurrentComponentDataMapSendAttributeService.removeFromMap(uid, gameObjectRecord.currentGeometryDataMap)
         |> ignore; */
      DisposeBoxGeometryMainService.handleDisposeComponent(component, state)
  );

let disposeCustomGeometryComponent =
  [@bs]
  (
    (uid: int, component: component, {settingRecord, gameObjectRecord} as state) =>
      /* TODO refactor: move to handleDisposeComponent */
      /* CurrentComponentDataMapSendAttributeService.removeFromMap(uid, gameObjectRecord.currentGeometryDataMap)
         |> ignore; */
      DisposeCustomGeometryMainService.handleDisposeComponent(component, state)
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
    (uid: int, component: component, state) => {
      ...state,
      basicMaterialRecord:
        Some(
          DisposeBasicMaterialService.handleDisposeComponent(
            component,
            RecordBasicMaterialMainService.getRecord(state)
          )
        )
    }
  );

let disposeLightMaterialComponent =
  [@bs]
  (
    (uid: int, component: component, state) => {
      ...state,
      lightMaterialRecord:
        Some(
          DisposeLightMaterialService.handleDisposeComponent(
            component,
            RecordLightMaterialMainService.getRecord(state)
          )
        )
    }
  );

let disposeAmbientLightComponent =
  [@bs]
  (
    (uid: int, component: component, {ambientLightRecord} as state) => {
      ...state,
      ambientLightRecord:
        DisposeAmbientLightService.handleDisposeComponent(component, ambientLightRecord)
    }
  );

let disposeDirectionLightComponent =
  [@bs]
  (
    (uid: int, component: component, {directionLightRecord} as state) => {
      ...state,
      directionLightRecord:
        DisposeDirectionLightService.handleDisposeComponent(component, directionLightRecord)
    }
  );

let disposePointLightComponent =
  [@bs]
  (
    (uid: int, component: component, {pointLightRecord} as state) => {
      ...state,
      pointLightRecord:
        DisposePointLightService.handleDisposeComponent(component, pointLightRecord)
    }
  );

let disposeSourceInstanceComponent =
    (uid: int, component: component, batchDisposeGameObjectFunc, state) =>
  [@bs]
  DisposeSourceInstanceMainService.handleDisposeComponent(
    component,
    batchDisposeGameObjectFunc,
    state
  );

/* let disposeObjectInstanceComponent =
   [@bs]
   (
     (uid: int, component: component, {objectInstanceRecord} as state) => {
       ...state,
       objectInstanceRecord:
         DisposeObjectInstanceMainService.handleDisposeComponent(component, objectInstanceRecord)
     }
   ); */
let disposeObjectInstanceComponent =
  [@bs]
  (
    (uid: int, component: component, state) =>
      DisposeObjectInstanceMainService.handleDisposeComponent(component, state)
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
    (uidMap, {settingRecord} as state, componentArray: array(component)) =>
  [@bs]
  DisposeTransformMainService.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    MemorySettingService.getMaxTypeArrayPoolSize(settingRecord),
    state
  );

let batchDisposeBoxGeometryComponent =
    (uidMap, {settingRecord} as state, componentArray: array(component)) =>
  [@bs] DisposeBoxGeometryMainService.handleBatchDisposeComponent(componentArray, uidMap, state);

let batchDisposeCustomGeometryComponent =
    (uidMap, {settingRecord} as state, componentArray: array(component)) =>
  [@bs]
  DisposeCustomGeometryMainService.handleBatchDisposeComponent(componentArray, uidMap, state);

let batchDisposeBasicMaterialComponent = (uidMap, state, componentArray: array(component)) => {
  ...state,
  basicMaterialRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        uidMap,
        RecordBasicMaterialMainService.getRecord(state),
        DisposeBasicMaterialService.handleBatchDisposeComponent,
        componentArray
      )
    )
};

let batchDisposeLightMaterialComponent = (uidMap, state, componentArray: array(component)) => {
  ...state,
  lightMaterialRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        uidMap,
        RecordLightMaterialMainService.getRecord(state),
        DisposeLightMaterialService.handleBatchDisposeComponent,
        componentArray
      )
    )
};

let batchDisposeAmbientLightComponent =
    (uidMap, {ambientLightRecord} as state, componentArray: array(component)) => {
  ...state,
  ambientLightRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      ambientLightRecord,
      DisposeAmbientLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeDirectionLightComponent =
    (uidMap, {directionLightRecord} as state, componentArray: array(component)) => {
  ...state,
  directionLightRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      directionLightRecord,
      DisposeDirectionLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposePointLightComponent =
    (uidMap, {pointLightRecord} as state, componentArray: array(component)) => {
  ...state,
  pointLightRecord:
    ComponentMapService.batchDisposeComponent(
      uidMap,
      pointLightRecord,
      DisposePointLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeSourceInstanceComponent =
    (
      uidMap,
      state: StateDataMainType.state,
      disposeGameObjectFunc,
      componentArray: array(component)
    ) =>
  [@bs]
  DisposeSourceInstanceMainService.handleBatchDisposeComponent(
    componentArray,
    uidMap,
    disposeGameObjectFunc,
    state
  );

/* let batchDisposeObjectInstanceComponent =
     (uidMap, {objectInstanceRecord} as state, componentArray: array(component)) =>
   switch (componentArray |> Js.Array.length) {
   | 0 => state
   | _ => {
       ...state,
       objectInstanceRecord:
         ComponentMapService.batchDisposeComponent(
           uidMap,
           objectInstanceRecord,
           DisposeObjectInstanceMainService.handleBatchDisposeComponent,
           componentArray
         )
     }
   }; */
let batchDisposeObjectInstanceComponent =
    (uidMap, state: StateDataMainType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ =>
    [@bs]
    DisposeObjectInstanceMainService.handleBatchDisposeComponent(componentArray, uidMap, state)
  };