open StateDataMainType;

open ComponentType;

let _removeComponent = (uid: int, componentMap) =>
  componentMap |> ComponentMapService.removeComponent(uid) |> Obj.magic;

let deferDisposeBasicCameraViewComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      basicCameraViewMap:
        _removeComponent(uid, gameObjectRecord.basicCameraViewMap),
      disposedBasicCameraViewArray:
        state.gameObjectRecord.disposedBasicCameraViewArray
        |> ArrayService.push(component),
    },
  };

let deferDisposePerspectiveCameraProjectionComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      perspectiveCameraProjectionMap:
        _removeComponent(
          uid,
          gameObjectRecord.perspectiveCameraProjectionMap,
        ),
      disposedPerspectiveCameraProjectionArray:
        gameObjectRecord.disposedPerspectiveCameraProjectionArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeArcballCameraControllerComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      arcballCameraControllerMap:
        _removeComponent(uid, gameObjectRecord.arcballCameraControllerMap),
      disposedArcballCameraControllerArray:
        gameObjectRecord.disposedArcballCameraControllerArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeTransformComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      transformMap: _removeComponent(uid, gameObjectRecord.transformMap),
      disposedTransformArray:
        gameObjectRecord.disposedTransformArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeTransformComponentForKeepOrder =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      transformMap: _removeComponent(uid, gameObjectRecord.transformMap),
      disposedTransformArrayForKeepOrder:
        gameObjectRecord.disposedTransformArrayForKeepOrder
        |> ArrayService.push(component),
    },
  };

let deferDisposeBasicMaterialComponent =
  (. uid: int, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      basicMaterialMap:
        _removeComponent(uid, gameObjectRecord.basicMaterialMap),
      disposedBasicMaterialDataArray:
        gameObjectRecord.disposedBasicMaterialDataArray
        |> ArrayService.push((uid, component)),
    },
  };

let deferDisposeLightMaterialComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      lightMaterialMap:
        _removeComponent(uid, gameObjectRecord.lightMaterialMap),
      disposedLightMaterialDataArray:
        gameObjectRecord.disposedLightMaterialDataArray
        |> ArrayService.push((uid, component)),
    },
  };

let deferDisposeGeometryComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      geometryMap: _removeComponent(uid, gameObjectRecord.geometryMap),
      disposedGeometryDataArray:
        gameObjectRecord.disposedGeometryDataArray
        |> ArrayService.push((uid, component)),
    },
  };

let deferDisposeSourceInstanceComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      sourceInstanceMap:
        _removeComponent(uid, gameObjectRecord.sourceInstanceMap),
      disposedSourceInstanceArray:
        gameObjectRecord.disposedSourceInstanceArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeObjectInstanceComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      objectInstanceMap:
        _removeComponent(uid, gameObjectRecord.objectInstanceMap),
      disposedObjectInstanceArray:
        gameObjectRecord.disposedObjectInstanceArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeDirectionLightComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      directionLightMap:
        _removeComponent(uid, gameObjectRecord.directionLightMap),
      disposedDirectionLightArray:
        gameObjectRecord.disposedDirectionLightArray
        |> ArrayService.push(component),
    },
  };

let deferDisposePointLightComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      pointLightMap: _removeComponent(uid, gameObjectRecord.pointLightMap),
      disposedPointLightArray:
        gameObjectRecord.disposedPointLightArray
        |> ArrayService.push(component),
    },
  };

let deferDisposeMeshRendererComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      meshRendererMap:
        _removeComponent(uid, gameObjectRecord.meshRendererMap),
      disposedMeshRendererComponentArray:
        gameObjectRecord.disposedMeshRendererComponentArray
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

let batchDisposeArcballCameraControllerComponent =
    (
      {arcballCameraControllerRecord} as state,
      componentArray: array(component),
    ) =>
  DisposeArcballCameraControllerMainService.handleBatchDisposeComponent(.
    componentArray,
    state,
  );

let batchDisposeMeshRendererComponent =
    (state, componentArray: array(component)) => {
  ...state,
  meshRendererRecord:
    Some(
      DisposeMeshRendererService.handleBatchDisposeComponent(.
        componentArray,
        RecordMeshRendererMainService.getRecord(state),
      ),
    ),
};

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

let batchDisposeGeometryComponent =
    ({settingRecord} as state, compnentDataArray) =>
  DisposeGeometryMainService.handleBatchDisposeComponent(.
    compnentDataArray,
    state,
  );

let batchDisposeBasicMaterialComponent = (state, compnentDataArray) =>
  DisposeBasicMaterialMainService.handleBatchDisposeComponent(.
    compnentDataArray,
    state,
  );

let batchDisposeBasicMaterialComponentForWorker = (state, componentDataArray) => {
  open BasicMaterialType;
  let state =
    DisposeBasicMaterialMainService.handleBatchDisposeComponent(.
      componentDataArray,
      state,
    );
  let {materialArrayForWorkerInit} as record =
    RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...record,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit
          |> MaterialArrayForWorkerInitService.removeDisposedOnesFromMaterialArrayForWorkerInit(
               componentDataArray,
             ),
      }),
  };
};

let batchDisposeLightMaterialComponent = (state, componentDataArray) =>
  DisposeLightMaterialMainService.handleBatchDisposeComponent(.
    componentDataArray,
    state,
  );

let batchDisposeLightMaterialComponentForWorker = (state, componentDataArray) => {
  open LightMaterialType;
  let state =
    DisposeLightMaterialMainService.handleBatchDisposeComponent(.
      componentDataArray,
      state,
    );
  let {materialArrayForWorkerInit} as record =
    RecordLightMaterialMainService.getRecord(state);
  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        materialArrayForWorkerInit:
          materialArrayForWorkerInit
          |> MaterialArrayForWorkerInitService.removeDisposedOnesFromMaterialArrayForWorkerInit(
               componentDataArray,
             ),
      }),
  };
};

let batchDisposeDirectionLightComponent =
    ({directionLightRecord} as state, componentArray: array(component)) => {
  ...state,
  directionLightRecord:
    ComponentMapService.batchDisposeComponent(
      directionLightRecord,
      DisposeDirectionLightService.handleBatchDisposeComponent,
      componentArray,
    ),
};

let batchDisposePointLightComponent =
    ({pointLightRecord} as state, componentArray: array(component)) => {
  ...state,
  pointLightRecord:
    ComponentMapService.batchDisposeComponent(
      pointLightRecord,
      DisposePointLightService.handleBatchDisposeComponent,
      componentArray,
    ),
};

let batchDisposeSourceInstanceComponent =
    (
      state: StateDataMainType.state,
      (isKeepOrder, isRemoveGeometry, isRemoveMaterial),
      disposeGameObjectFunc,
      componentArray: array(component),
    ) =>
  DisposeSourceInstanceMainService.handleBatchDisposeComponent(.
    componentArray,
    (isKeepOrder, isRemoveGeometry, isRemoveMaterial),
    disposeGameObjectFunc,
    state,
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
    (state: StateDataMainType.state, componentArray: array(component)) =>
  switch (componentArray |> Js.Array.length) {
  | 0 => state
  | _ =>
    DisposeObjectInstanceMainService.handleBatchDisposeComponent(.
      componentArray,
      state,
    )
  };