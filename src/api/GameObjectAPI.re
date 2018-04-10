open StateDataMainType;

open GameObjectType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open GetComponentGameObjectService;

open HasComponentGameObjectService;

open CloneComponentGameObjectMainService;

open AddGameObjectComponentMainService;

open DisposeGameObjectMainService;

open CloneGameObjectMainService;

open CreateGameObjectMainService;

open AliveGameObjectMainService;

let createGameObject = (state: StateDataMainType.state) => create(state);

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: StateDataMainType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|gameObject alive|j}, ~actual={j|not|j}),
        () => isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addBasicCameraViewComponent(gameObject, component, state)
};

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeBasicCameraViewComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state)
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposePerspectiveCameraProjectionComponent(gameObject, component, state)
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addTransformComponent(gameObject, component, state)
};

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, isKeepOrder, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeTransformComponent(gameObject, component, isKeepOrder, state)
};

let unsafeGetGameObjectTransformComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasTransformComponent(gameObject, state.gameObjectRecord)
};

let unsafeGetGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGeometryComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addBoxGeometryComponent(gameObject, component, state)
};

let disposeGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeBoxGeometryComponent(gameObject, component, state)
};

let hasGameObjectBoxGeometryComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectCustomGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addCustomGeometryComponent(gameObject, component, state)
};

let disposeGameObjectCustomGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeCustomGeometryComponent(gameObject, component, state)
};

let hasGameObjectCustomGeometryComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasCustomGeometryComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addBasicMaterialComponent(gameObject, component, state)
};

let disposeGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeBasicMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] unsafeGetBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicMaterialComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addLightMaterialComponent(gameObject, component, state)
};

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeLightMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectLightMaterialComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] unsafeGetLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectLightMaterialComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addMeshRendererComponent(gameObject, component, state)
};

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeMeshRendererComponent(gameObject, component, state)
};

let unsafeGetGameObjectMeshRendererComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addAmbientLightComponent(gameObject, component, state)
};

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeAmbientLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectAmbientLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectAmbientLightComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addDirectionLightComponent(gameObject, component, state)
};

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeDirectionLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectDirectionLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectDirectionLightComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addPointLightComponent(gameObject, component, state)
};

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposePointLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectPointLightComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetPointLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPointLightComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasPointLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addSourceInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectSourceInstanceComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectSourceInstanceComponent = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  hasSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  disposeSourceInstanceComponent(
    gameObject,
    component,
    DisposeGameObjectMainService.batchDispose,
    state
  )
};

let addGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  addObjectInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectObjectInstanceComponent =
    (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetObjectInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] disposeObjectInstanceComponent(gameObject, component, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: StateDataMainType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  dispose(gameObject, state)
};

let disposeGameObjectKeepOrder = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  disposeKeepOrder(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  InitGameObjectMainService.initGameObject(gameObject, state)
};

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArrayService.forEach(
                 [@bs] ((gameObject) => _checkGameObjectShouldAlive(gameObject, state))
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject =
    (
      gameObject: gameObject,
      count: int,
      isShareMaterial: Js.boolean,
      state: StateDataMainType.state
    ) =>
  clone(gameObject, count, Js.to_bool(isShareMaterial), state);