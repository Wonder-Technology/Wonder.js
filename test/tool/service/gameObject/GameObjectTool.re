open GameObjectType;

open ComponentType;

let createGameObject = (state: StateDataMainType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (state, gameObject, GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state))
};

let getGameObjectRecord = (state: StateDataMainType.state) => state.gameObjectRecord;

let initGameObject = (gameObject, state: StateDataMainType.state) =>
  state |> AllMaterialTool.prepareForInit |> GameObjectAPI.initGameObject(gameObject);

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  let (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr) =
    DisposeGameObjectMainService.batchDispose(gameObjectArray, false, state);
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(boxGeometryNeedDisposeVboBufferArr)
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr
         )
  }
};

let batchDisposeGameObjectKeepOrder =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  let (state, boxGeometryNeedDisposeVboBufferArr, customGeometryNeedDisposeVboBufferArr) =
    DisposeGameObjectMainService.batchDispose(gameObjectArray, true, state);
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeBoxGeometryVboBuffer(boxGeometryNeedDisposeVboBufferArr)
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr
         )
  }
};

let disposeGameObject = (gameObject: gameObject, state: StateDataMainType.state) =>
  batchDisposeGameObject([|gameObject|], state);

let disposeGameObjectKeepOrder = (gameObject: gameObject, state: StateDataMainType.state) =>
  batchDisposeGameObjectKeepOrder([|gameObject|], state);

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeBasicCameraViewComponent(component, state);

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs]
  DisposeComponentGameObjectTool.disposePerspectiveCameraProjectionComponent(component, state);

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, isKeepOrder, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeTransformComponent(component, isKeepOrder, state);

let disposeGameObjectBoxGeometryComponentWithoutVboBuffer =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  let (state, boxGeometryNeedDisposeVboBufferArr) =
    DisposeComponentGameObjectMainService.batchDisposeBoxGeometryComponent(state, [|component|]);
  state
};

let disposeGameObjectCustomGeometryComponentWithoutVboBuffer =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  let (state, customGeometryNeedDisposeVboBufferArr) =
    DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(
      state,
      [|component|]
    );
  state
};

let disposeGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeBasicMaterialComponent(component, state);

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeLightMaterialComponent(component, state);

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeMeshRendererComponent(gameObject, component, state);

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeAmbientLightComponent(component, state);

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeDirectionLightComponent(component, state);

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposePointLightComponent(component, state);

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
    state,
    false,
    DisposeGameObjectMainService.batchDispose,
    [|component|]
  );

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectTool.disposeObjectInstanceComponent(component, state);