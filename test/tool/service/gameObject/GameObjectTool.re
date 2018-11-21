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
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeGameObjectMainService.batchDispose(
      (
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent,
      ),
      gameObjectArray,
      (false, false, false),
      state,
    );
  let state = state |> ReallocateCPUMemoryJob.execJob(None);
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeGeometryVboBuffer(
           geometryNeedDisposeVboBufferArr,
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
    geometryNeedDisposeVboBufferArr,
    sourceInstanceNeedDisposeVboBufferArr,
  ) =
    DisposeGameObjectMainService.batchDispose(
      (
        DisposeComponentGameObjectMainService.batchDisposeBasicMaterialComponent,
        DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent,
      ),
      gameObjectArray,
      (true, false, false),
      state,
    );
  {
    ...state,
    vboBufferRecord:
      state.vboBufferRecord
      |> DisposeVboBufferService.disposeGeometryVboBuffer(
           geometryNeedDisposeVboBufferArr,
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

let disposeGameObjectGeometryComponentWithoutVboBufferAndNotReallocate =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  let (state, geometryNeedDisposeVboBufferArr) =
    DisposeComponentGameObjectMainService.batchDisposeGeometryComponentData(
      state,
      [|(gameObject, component)|],
    );
  state;
};

let disposeGameObjectGeometryComponentWithoutVboBuffer =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  let (state, geometryNeedDisposeVboBufferArr) =
    DisposeComponentGameObjectMainService.batchDisposeGeometryComponentData(
      state,
      [|(gameObject, component)|],
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
    [|(gameObject, component)|],
  );

let disposeGameObjectLightMaterialComponent =
    (
      gameObject: gameObject,
      component: component,
      state: StateDataMainType.state,
    ) =>
  DisposeComponentGameObjectMainService.batchDisposeLightMaterialComponent(
    state,
    [|(gameObject, component)|],
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
      (false, false, false),
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

let getChildren = (gameObject, state) =>
  TransformAPI.unsafeGetTransformChildren(
    GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state),
    state,
  )
  |> Js.Array.map(transform =>
       transform |> TransformAPI.unsafeGetTransformGameObject(_, state)
     );
let testDisposeKeepOrder =
    (disposeGameObjectKeepOrderRemoveGeometryFunc, state) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  /* open Sinon; */

  let (state, parent, tra) = createGameObject(state^);
  let (state, child1, tra1) = createGameObject(state);
  let (state, child2, tra2) = createGameObject(state);
  let (state, child3, tra3) = createGameObject(state);
  let state =
    state
    |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra1)
    |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra2)
    |> TransformAPI.setTransformParent(Js.Nullable.return(tra), tra3);
  let state = state |> disposeGameObjectKeepOrderRemoveGeometryFunc(child1);
  let state = DisposeJob.execJob(None, state);

  TransformAPI.unsafeGetTransformChildren(tra, state)
  |> expect == [|tra2, tra3|];
};

let isAlive = AliveGameObjectMainService.isAlive;