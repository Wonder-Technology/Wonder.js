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

let createGameObject = (state: MainStateDataType.state) => create(state);

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: MainStateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|gameObject alive|j}, ~actual={j|not|j}),
        () => isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addBasicCameraViewComponent(gameObject, component, state)
};

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeBasicCameraViewComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicCameraViewComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state)
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposePerspectiveCameraProjectionComponent(gameObject, component, state)
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addTransformComponent(gameObject, component, state)
};

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeTransformComponent(gameObject, component, state)
};

let unsafeGetGameObjectTransformComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasTransformComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addBoxGeometryComponent(gameObject, component, state)
};

let disposeGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeBoxGeometryComponent(gameObject, component, state)
};

let unsafeGetGameObjectBoxGeometryComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBoxGeometryComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addBasicMaterialComponent(gameObject, component, state)
};

let disposeGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeBasicMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicMaterialComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicMaterialComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addLightMaterialComponent(gameObject, component, state)
};

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeLightMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectLightMaterialComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectLightMaterialComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addMeshRendererComponent(gameObject, component, state)
};

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeMeshRendererComponent(gameObject, component, state)
};

let unsafeGetGameObjectMeshRendererComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addAmbientLightComponent(gameObject, component, state)
};

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeAmbientLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectAmbientLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectAmbientLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addDirectionLightComponent(gameObject, component, state)
};

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeDirectionLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectDirectionLightComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectDirectionLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addPointLightComponent(gameObject, component, state)
};

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposePointLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectPointLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetPointLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPointLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasPointLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addSourceInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectSourceInstanceComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectSourceInstanceComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  hasSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  disposeSourceInstanceComponent(
    gameObject,
    component,
    DisposeGameObjectMainService.batchDispose,
    state
  )
};

let addGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  addObjectInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectObjectInstanceComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetObjectInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] disposeObjectInstanceComponent(gameObject, component, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: MainStateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  dispose(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  InitGameObjectMainService.initGameObject(gameObject, state)
};

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: MainStateDataType.state) => {
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
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject =
    (gameObject: gameObject, count: int, isShareMaterial: Js.boolean, state: MainStateDataType.state) =>
  clone(gameObject, count, Js.to_bool(isShareMaterial), state);