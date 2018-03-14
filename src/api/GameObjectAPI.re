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
    MainStateData.stateData.isDebug
  );
  addBasicCameraViewComponent(gameObject, component, state)
};

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeBasicCameraViewComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicCameraViewComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state)
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposePerspectiveCameraProjectionComponent(gameObject, component, state)
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addTransformComponent(gameObject, component, state)
};

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeTransformComponent(gameObject, component, state)
};

let unsafeGetGameObjectTransformComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasTransformComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addBoxGeometryComponent(gameObject, component, state)
};

let disposeGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeBoxGeometryComponent(gameObject, component, state)
};

let unsafeGetGameObjectBoxGeometryComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBoxGeometryComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addBasicMaterialComponent(gameObject, component, state)
};

let disposeGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeBasicMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicMaterialComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicMaterialComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasBasicMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addLightMaterialComponent(gameObject, component, state)
};

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeLightMaterialComponent(gameObject, component, state)
};

let unsafeGetGameObjectLightMaterialComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectLightMaterialComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasLightMaterialComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addMeshRendererComponent(gameObject, component, state)
};

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeMeshRendererComponent(gameObject, component, state)
};

let unsafeGetGameObjectMeshRendererComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasMeshRendererComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addAmbientLightComponent(gameObject, component, state)
};

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeAmbientLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectAmbientLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectAmbientLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasAmbientLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addDirectionLightComponent(gameObject, component, state)
};

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeDirectionLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectDirectionLightComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectDirectionLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasDirectionLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addPointLightComponent(gameObject, component, state)
};

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposePointLightComponent(gameObject, component, state)
};

let unsafeGetGameObjectPointLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetPointLightComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPointLightComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasPointLightComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  addSourceInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectSourceInstanceComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectSourceInstanceComponent = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  hasSourceInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
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
    MainStateData.stateData.isDebug
  );
  addObjectInstanceComponent(gameObject, component, state)
};

let unsafeGetGameObjectObjectInstanceComponent =
    (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  unsafeGetObjectInstanceComponent(gameObject, state.gameObjectRecord)
};

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  [@bs] disposeObjectInstanceComponent(gameObject, component, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: MainStateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
  );
  dispose(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    MainStateData.stateData.isDebug
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
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs] ((gameObject) => _checkGameObjectShouldAlive(gameObject, state))
               )
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject =
    (gameObject: gameObject, count: int, isShareMaterial: Js.boolean, state: MainStateDataType.state) =>
  clone(gameObject, count, Js.to_bool(isShareMaterial), state);