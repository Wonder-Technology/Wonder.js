open StateDataMainType;

open ComponentType;

let _removeComponent = (uid: int, componentMap) =>
  componentMap |> ComponentMapService.removeComponent(uid) |> Obj.magic;

let deferDisposeScriptComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      scriptMap: _removeComponent(uid, gameObjectRecord.scriptMap),
      disposedScriptArray:
        state.gameObjectRecord.disposedScriptArray
        |> ArrayService.push(component),
    },
  };

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

let deferDisposeFlyCameraControllerComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      flyCameraControllerMap:
        _removeComponent(uid, gameObjectRecord.flyCameraControllerMap),
      disposedFlyCameraControllerArray:
        gameObjectRecord.disposedFlyCameraControllerArray
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
      disposedBasicMaterialDataMap:
        gameObjectRecord.disposedBasicMaterialDataMap
        |> ArrayMapService.addValue(component, uid),
    },
  };

let deferDisposeLightMaterialComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      lightMaterialMap:
        _removeComponent(uid, gameObjectRecord.lightMaterialMap),
      disposedLightMaterialDataMap:
        gameObjectRecord.disposedLightMaterialDataMap
        |> ArrayMapService.addValue(component, uid),
    },
  };

let deferDisposeGeometryComponent =
  (. uid, component: component, {gameObjectRecord} as state) => {
    ...state,
    gameObjectRecord: {
      ...gameObjectRecord,
      geometryMap: _removeComponent(uid, gameObjectRecord.geometryMap),
      disposedGeometryDataMap:
        gameObjectRecord.disposedGeometryDataMap
        |> ArrayMapService.addValue(component, uid),
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

let batchDisposeScriptComponent = (state, componentArray: array(component)) =>
  /* ...state,
     scriptRecord:
       ComponentMapService.batchDisposeComponent(
         scriptRecord,
         DisposeScriptMainService.handleBatchDisposeComponent,
         componentArray,
       ), */
  DisposeScriptMainService.handleBatchDisposeComponent(componentArray, state);

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

let batchDisposeFlyCameraControllerComponent =
    (
      {flyCameraControllerRecord} as state,
      componentArray: array(component),
    ) =>
  DisposeFlyCameraControllerMainService.handleBatchDisposeComponent(.
    componentArray,
    state,
  );
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

let batchDisposeGeometryComponentData =
    ({settingRecord} as state, compnentDataMap) =>
  DisposeGeometryMainService.handleBatchDisposeComponentData(.
    compnentDataMap,
    state,
  );

let _batchDisposeSharableComponent =
    (
      componentArray,
      (
        getRecordFunc,
        getGameObjectsFunc,
        deferDisposeComponentFunc,
        handleBatchDisposeComponentFunc,
      ),
      {settingRecord} as state,
    ) => {
  let (componentHasNoGameObjectArr, state) =
    componentArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. (componentHasNoGameObjectArr, state), component) => {
           let geometryRecord = state |> getRecordFunc;

           switch (getGameObjectsFunc(component, geometryRecord)) {
           | Some(gameObjects) => (
               componentHasNoGameObjectArr,
               gameObjects
               |> WonderCommonlib.ArrayService.reduceOneParam(
                    (. state, gameObject) =>
                      deferDisposeComponentFunc(.
                        gameObject,
                        component,
                        state,
                      ),
                    state,
                  ),
             )

           | None => (
               componentHasNoGameObjectArr |> ArrayService.push(component),
               state,
             )
           };
         },
         ([||], state),
       );

  handleBatchDisposeComponentFunc(componentHasNoGameObjectArr, state);
};

let batchDisposeGeometryComponent =
    (componentArray, {settingRecord} as state) =>
  _batchDisposeSharableComponent(
    componentArray,
    (
      RecordGeometryMainService.getRecord,
      GameObjectGeometryService.getGameObjects,
      deferDisposeGeometryComponent,
      DisposeGeometryMainService.handleBatchDisposeComponent,
    ),
    state,
  );

let batchDisposeBasicMaterialComponentData = (state, compnentDataMap) =>
  DisposeBasicMaterialMainService.handleBatchDisposeComponentData(.
    compnentDataMap,
    state,
  );

let batchDisposeBasicMaterialComponentDataForWorker =
    (state, componentDataMap) => {
  open BasicMaterialType;
  let state =
    DisposeBasicMaterialMainService.handleBatchDisposeComponentData(.
      componentDataMap,
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
               componentDataMap,
             ),
      }),
  };
};

let batchDisposeBasicMaterialComponent =
    (componentArray, {settingRecord} as state) =>
  _batchDisposeSharableComponent(
    componentArray,
    (
      RecordBasicMaterialMainService.getRecord,
      GameObjectBasicMaterialService.getGameObjects,
      deferDisposeBasicMaterialComponent,
      DisposeBasicMaterialMainService.handleBatchDisposeComponent,
    ),
    state,
  );

let batchDisposeLightMaterialComponentData = (state, componentDataMap) =>
  DisposeLightMaterialMainService.handleBatchDisposeComponentData(.
    componentDataMap,
    state,
  );

let batchDisposeLightMaterialComponentDataForWorker =
    (state, componentDataMap) => {
  open LightMaterialType;
  let state =
    DisposeLightMaterialMainService.handleBatchDisposeComponentData(.
      componentDataMap,
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
               componentDataMap,
             ),
      }),
  };
};

let batchDisposeLightMaterialComponent =
    (componentArray, {settingRecord} as state) =>
  _batchDisposeSharableComponent(
    componentArray,
    (
      RecordLightMaterialMainService.getRecord,
      GameObjectLightMaterialService.getGameObjects,
      deferDisposeLightMaterialComponent,
      DisposeLightMaterialMainService.handleBatchDisposeComponent,
    ),
    state,
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