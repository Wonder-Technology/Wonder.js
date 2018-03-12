open GameObjectType;

open ComponentType;

open DisposeComponentGameObjectService;

open GetComponentGameObjectService;

open HasComponentGameObjectService;

open CloneComponentGameObjectService;

open AddGameObjectComponentService;

open DisposeGameObjectComponentService;

open CloneGameObjectComponentService;

open CreateGameObjectService;

let createGameObject = (state: StateDataType.state) => create(state);

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|gameObject alive|j}, ~actual={j|not|j}),
        () => isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addBasicCameraViewComponent(gameObject, component, state)
};

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  [@bs] disposeBasicCameraViewComponent(gameObject, component, state)
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBasicCameraViewComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state)
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  [@bs] disposePerspectiveCameraProjectionComponent(gameObject, component, state)
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addTransformComponent(gameObject, component, state)
};

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  [@bs] disposeTransformComponent(gameObject, component, state)
};

let unsafeGetGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasTransformComponent(gameObject, state.gameObjectRecord)
};

let addGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addBoxGeometryComponent(gameObject, component, state)
};

let disposeGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  [@bs] disposeBoxGeometryComponent(gameObject, component, state)
};

let unsafeGetGameObjectBoxGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  unsafeGetBoxGeometryComponent(gameObject, state.gameObjectRecord)
};

let hasGameObjectBoxGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasBoxGeometryComponent(gameObject, state.gameObjectRecord)
};