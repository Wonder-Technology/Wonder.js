open StateDataMainType;

open ComponentType;

let deferDisposeBasicCameraViewComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedBasicCameraViewArray:
        state.gameObjectRecord.disposedBasicCameraViewArray
        |> ArrayService.push(component),
    },
  };

let deferDisposePerspectiveCameraProjectionComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedPerspectiveCameraProjectionArray:
        state.gameObjectRecord.disposedPerspectiveCameraProjectionArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeTransformComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedTransformArray:
        state.gameObjectRecord.disposedTransformArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeTransformComponentForKeepOrder =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedTransformArrayForKeepOrder:
        state.gameObjectRecord.disposedTransformArrayForKeepOrder
        |> ArrayService.push(component),
    },
  };

let deferDisposeBasicMaterialComponent =
  (. gameObject, component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedBasicMaterialDataMap:
        state.gameObjectRecord.disposedBasicMaterialDataMap
        |> ArrayMapService.addValue(component, gameObject),
    },
  };

let deferDisposeLightMaterialComponent =
  (. gameObject, component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedLightMaterialDataMap:
        state.gameObjectRecord.disposedLightMaterialDataMap
        |> ArrayMapService.addValue(component, gameObject),
    },
  };

let deferDisposeGeometryComponent =
  (. gameObject, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedGeometryDataMap:
        gameObjectRecord.disposedGeometryDataMap
        |> ArrayMapService.addValue(component, gameObject),
    },
  };

let deferDisposeSourceInstanceComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedSourceInstanceArray:
        state.gameObjectRecord.disposedSourceInstanceArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeObjectInstanceComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedObjectInstanceArray:
        state.gameObjectRecord.disposedObjectInstanceArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeDirectionLightComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedDirectionLightArray:
        state.gameObjectRecord.disposedDirectionLightArray
        |> ArrayService.push(component),
    },
  };

let deferDisposePointLightComponent =
  (. component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedPointLightArray:
        state.gameObjectRecord.disposedPointLightArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeMeshRendererComponent =
  (. uid: int, component: component, state) => {
    ...state,
    gameObjectRecord: {
      ...state.gameObjectRecord,
      disposedMeshRendererComponentArray:
        state.gameObjectRecord.disposedMeshRendererComponentArray
        |> ArrayService.push(component),
    },
  };

let batchDisposeBasicCameraViewComponent =
    ({basicCameraViewRecord} as state, componentArray: array(component)) => {
  ...state,
  basicCameraViewRecord:
    ComponentMapService.batchDisposeComponent(
      basicCameraViewRecord,
      DisposeBasicCameraViewService.handleBatchDisposeComponent,
      componentArray,
    ),
};

let batchDisposePerspectiveCameraProjectionComponent =
    (
      {perspectiveCameraProjectionRecord} as state,
      componentArray: array(component),
    ) => {
  ...state,
  perspectiveCameraProjectionRecord:
    ComponentMapService.batchDisposeComponent(
      perspectiveCameraProjectionRecord,
      DisposePerspectiveCameraProjectionService.handleBatchDisposeComponent,
      componentArray,
    ),
};

let batchDisposeMeshRendererComponent =
    ({meshRendererRecord} as state, componentArray: array(component)) =>
  DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
    state,
    componentArray,
  );

let batchDisposeTransformComponent =
    (
      {settingRecord} as state,
      isKeepOrder,
      componentArray: array(component),
    ) =>
  DisposeTransformMainService.handleBatchDisposeComponent(.
    componentArray,
    MemorySettingService.getMaxTypeArrayPoolSize(settingRecord),
    isKeepOrder,
    state,
  );

let batchDisposeGeometryComponentData =
    ({settingRecord} as state, geometryDataArray) =>
  DisposeGeometryMainService.handleBatchDisposeComponentData(.
    geometryDataArray,
    state,
  );

let batchDisposeBasicMaterialComponent = (state, componentDataArray) =>
  DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponentData(
    state,
    componentDataArray,
  );

let batchDisposeLightMaterialComponent = (state, componentDataArray) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponentData(
    state,
    componentDataArray,
  );

let batchDisposeDirectionLightComponent =
    (state, componentArray: array(component)) => {
  ...state,
  directionLightRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        RecordDirectionLightMainService.getRecord(state),
        DisposeDirectionLightService.handleBatchDisposeComponent,
        componentArray,
      ),
    ),
};

let batchDisposePointLightComponent =
    (state, componentArray: array(component)) => {
  ...state,
  pointLightRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        RecordPointLightMainService.getRecord(state),
        DisposePointLightService.handleBatchDisposeComponent,
        componentArray,
      ),
    ),
};

let batchDisposeSourceInstanceComponent =
    (
      state: StateDataMainType.state,
      isKeepOrder,
      disposeGameObjectFunc,
      componentArray: array(component),
    ) =>
  DisposeSourceInstanceMainService.handleBatchDisposeComponent(.
    componentArray,
    isKeepOrder,
    disposeGameObjectFunc,
    state,
  );

let batchDisposeObjectInstanceComponent =
    (state: StateDataMainType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ =>
    DisposeObjectInstanceMainService.handleBatchDisposeComponent(.
      componentArray,
      state,
    )
  };