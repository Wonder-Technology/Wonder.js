open StateDataMainType;

open GameObjectType;

open ComponentType;

let createGameObject = (state: StateDataMainType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (
    state,
    gameObject,
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
  );
};

let getGameObjectRecord = (state: StateDataMainType.state) =>
  state.gameObjectRecord;

let initGameObject = (gameObject, state: StateDataMainType.state) =>
  state
  |> AllMaterialTool.prepareForInit
  |> GameObjectAPI.initGameObject(gameObject);

let batchDisposeGameObject =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  let (
    state,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeGameObjectMainService.batchDispose(
      (
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent,
      ),
      gameObjectArray,
      false,
      state,
    );
  let state = state |> ReallocateCPUMemoryJob.execJob(None);
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr,
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           sourceInstanceNeedDisposeVboBufferArr,
         ),
  };
};

let batchDisposeGameObjectKeepOrder =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  let (
    state,
    customGeometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeGameObjectMainService.batchDispose(
      (
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent,
      ),
      gameObjectArray,
      true,
      state,
    );
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeCustomGeometryVboBuffer(
           customGeometryNeedDisposeVboBufferArr,
         )
      |> DisposeVboBufferService.disposeSourceInstanceVboBuffer(
           sourceInstanceNeedDisposeVboBufferArr,
         ),
  };
};

let disposeGameObject =
    (gameObject: gameObject, state: StateDataMainType.state) =>
  batchDisposeGameObject([|gameObject|], state);

let disposeGameObjectKeepOrder =
    (gameObject: gameObject, state: StateDataMainType.state) =>
  batchDisposeGameObjectKeepOrder([|gameObject|], state);

let disposeGameObjectBasicCameraViewComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeBasicCameraViewComponent(
    state,
    [|component|],
  );

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposePerspectiveCameraProjectionComponent(
    state,
    [|component|],
  );

let disposeGameObjectArcballCameraControllerComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeArcballCameraControllerComponent(
    state,
    [|component|],
  );

let disposeGameObjectTransformComponent =
    (
      gameObject: gameObject,
      component: component,
      isKeepOrder,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeTransformComponent(
    state,
    isKeepOrder,
    [|component|],
  );

let disposeGameObjectCustomGeometryComponentWithoutVboBuffer =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  let (state, customGeometryNeedDisposeVboBufferArr) =
    DisposeComponentGameObjectMainService.batchDisposeCustomGeometryComponent(
      state,
      [|component|],
    );
  let state = state |> ReallocateCPUMemoryJob.execJob(None);
  state;
};

let disposeGameObjectBasicMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent(
    state,
    [|component|],
  );

let disposeGameObjectLightMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(
    state,
    [|component|],
  );

let disposeGameObjectMeshRendererComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeMeshRendererComponent(
    state,
    [|component|],
  );

let disposeGameObjectDirectionLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeDirectionLightComponent(
    state,
    [|component|],
  );

let disposeGameObjectPointLightComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposePointLightComponent(
    state,
    [|component|],
  );

let disposeGameObjectSourceInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  let (state, _) =
    DisposeComponentGameObjectMainService.batchDisposeSourceInstanceComponent(
      state,
      false,
      DisposeGameObjectMainService.batchDispose((
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent,
      )),
      [|component|],
    );
  state;
};

let disposeGameObjectObjectInstanceComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeObjectInstanceComponent(
    state,
    [|component|],
  );

let addChild =
    (parentGameObject, childGameObject, {gameObjectRecord} as state) => {
  ...state,
  transformRecord:
    Some(
      HierachyTransformService.setParent(.
        GetComponentGameObjectService.unsafeGetTransformComponent(
          parentGameObject,
          gameObjectRecord,
        )
        |. Some,
        GetComponentGameObjectService.unsafeGetTransformComponent(
          childGameObject,
          gameObjectRecord,
        ),
        RecordTransformMainService.getRecord(state),
      ),
    ),
};

let addChildren =
    (parentGameObject, childGameObjectArr, {gameObjectRecord} as state) =>
  childGameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, childGameObject) =>
         addChild(parentGameObject, childGameObject, state),
       state,
     );