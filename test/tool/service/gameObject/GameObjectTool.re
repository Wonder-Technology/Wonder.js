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
    DisposeGameObjectMainService.batchDispose(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
      gameObjectArray,
      false,
      state
    );
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
    DisposeGameObjectMainService.batchDispose(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
      gameObjectArray,
      true,
      state
    );
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
  DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(state, [|component|]);

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
    state,
    [|component|]
  );

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, isKeepOrder, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeTransformComponent(
    state,
    isKeepOrder,
    [|component|]
  );

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
  DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(state, [|component|]);

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(state, [|component|]);

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
    DisposeECSService.buildMapFromArray(
      [|gameObject|],
      WonderCommonlib.SparseMapService.createEmpty()
    ),
    state,
    [|component|]
  );

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeAmbientLightComponent(state, [|component|]);

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(state, [|component|]);

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposePointLightComponent(state, [|component|]);

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
    state,
    false,
    DisposeGameObjectMainService.batchDispose(
      DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent
    ),
    [|component|]
  );

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(state, [|component|]);