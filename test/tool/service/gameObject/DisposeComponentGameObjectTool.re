open StateDataMainType;

open ComponentType;

let deferDisposeBasicCameraViewComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedBasicCameraViewArray:
          state.gameObjectRecord.disposedBasicCameraViewArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposePerspectiveCameraProjectionComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedPerspectiveCameraProjectionArray:
          state.gameObjectRecord.disposedPerspectiveCameraProjectionArray
          |> ArrayService.push(component)
      }
    }
  );

let deferDisposeTransformComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedTransformArray:
          state.gameObjectRecord.disposedTransformArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeTransformComponentForKeepOrder =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedTransformArrayForKeepOrder:
          state.gameObjectRecord.disposedTransformArrayForKeepOrder |> ArrayService.push(component)
      }
    }
  );

let deferDisposeBasicMaterialComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedBasicMaterialArray:
          state.gameObjectRecord.disposedBasicMaterialArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeLightMaterialComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedLightMaterialArray:
          state.gameObjectRecord.disposedLightMaterialArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeBoxGeometryComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedBoxGeometryArray:
          state.gameObjectRecord.disposedBoxGeometryArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeCustomGeometryComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedCustomGeometryArray:
          state.gameObjectRecord.disposedCustomGeometryArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeSourceInstanceComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedSourceInstanceArray:
          state.gameObjectRecord.disposedSourceInstanceArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeObjectInstanceComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedObjectInstanceArray:
          state.gameObjectRecord.disposedObjectInstanceArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeAmbientLightComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedAmbientLightArray:
          state.gameObjectRecord.disposedAmbientLightArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeDirectionLightComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedDirectionLightArray:
          state.gameObjectRecord.disposedDirectionLightArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposePointLightComponent =
  [@bs]
  (
    (component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedPointLightArray:
          state.gameObjectRecord.disposedPointLightArray |> ArrayService.push(component)
      }
    }
  );

let deferDisposeMeshRendererComponent =
  [@bs]
  (
    (uid, component: component, state) => {
      ...state,
      gameObjectRecord: {
        ...state.gameObjectRecord,
        disposedMeshRendererUidArray:
          state.gameObjectRecord.disposedMeshRendererUidArray |> ArrayService.push(uid),
        disposedMeshRendererComponentArray:
          state.gameObjectRecord.disposedMeshRendererComponentArray |> ArrayService.push(component)
      }
    }
  );

let batchDisposeBasicCameraViewComponent =
    ({basicCameraViewRecord} as state, componentArray: array(component)) => {
  ...state,
  basicCameraViewRecord:
    ComponentMapService.batchDisposeComponent(
      basicCameraViewRecord,
      DisposeBasicCameraViewService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposePerspectiveCameraProjectionComponent =
    ({perspectiveCameraProjectionRecord} as state, componentArray: array(component)) => {
  ...state,
  perspectiveCameraProjectionRecord:
    ComponentMapService.batchDisposeComponent(
      perspectiveCameraProjectionRecord,
      DisposePerspectiveCameraProjectionService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeMeshRendererComponent =
    (uidMap, {meshRendererRecord} as state, componentArray: array(component)) => {
  ...state,
  meshRendererRecord:
    ComponentMapService.batchDisposeComponentWithUidMap(
      uidMap,
      meshRendererRecord,
      DisposeMeshRendererService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeTransformComponent =
    ({settingRecord} as state, isKeepOrder, componentArray: array(component)) =>
  [@bs]
  DisposeTransformMainService.handleBatchDisposeComponent(
    componentArray,
    MemorySettingService.getMaxTypeArrayPoolSize(settingRecord),
    isKeepOrder,
    state
  );

let batchDisposeBoxGeometryComponent = ({settingRecord} as state, componentArray: array(component)) =>
  [@bs] DisposeBoxGeometryMainService.handleBatchDisposeComponent(componentArray, state);

let batchDisposeCustomGeometryComponent =
    ({settingRecord} as state, componentArray: array(component)) =>
  [@bs] DisposeCustomGeometryMainService.handleBatchDisposeComponent(componentArray, state);

let batchDisposeBasicMaterialComponent = (state, componentArray: array(component)) => {
  ...state,
  basicMaterialRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        RecordBasicMaterialMainService.getRecord(state),
        DisposeBasicMaterialService.handleBatchDisposeComponent,
        componentArray
      )
    )
};

let batchDisposeLightMaterialComponent = (state, componentArray: array(component)) => {
  ...state,
  lightMaterialRecord:
    Some(
      ComponentMapService.batchDisposeComponent(
        RecordLightMaterialMainService.getRecord(state),
        DisposeLightMaterialService.handleBatchDisposeComponent,
        componentArray
      )
    )
};

let batchDisposeAmbientLightComponent =
    ({ambientLightRecord} as state, componentArray: array(component)) => {
  ...state,
  ambientLightRecord:
    ComponentMapService.batchDisposeComponent(
      ambientLightRecord,
      DisposeAmbientLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeDirectionLightComponent =
    ({directionLightRecord} as state, componentArray: array(component)) => {
  ...state,
  directionLightRecord:
    ComponentMapService.batchDisposeComponent(
      directionLightRecord,
      DisposeDirectionLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposePointLightComponent =
    ({pointLightRecord} as state, componentArray: array(component)) => {
  ...state,
  pointLightRecord:
    ComponentMapService.batchDisposeComponent(
      pointLightRecord,
      DisposePointLightService.handleBatchDisposeComponent,
      componentArray
    )
};

let batchDisposeSourceInstanceComponent =
    (
      state: StateDataMainType.state,
      isKeepOrder,
      disposeGameObjectFunc,
      componentArray: array(component)
    ) =>
  [@bs]
  DisposeSourceInstanceMainService.handleBatchDisposeComponent(
    componentArray,
    isKeepOrder,
    disposeGameObjectFunc,
    state
  );

let batchDisposeObjectInstanceComponent =
    (state: StateDataMainType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ => [@bs] DisposeObjectInstanceMainService.handleBatchDisposeComponent(componentArray, state)
  };