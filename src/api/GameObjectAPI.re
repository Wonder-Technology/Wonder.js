open GameObjectType;

open ComponentType;

open GameObjectDisposeComponentService;

open GameObjectGetComponentService;

open GameObjectHasComponentService;

open GameObjectCloneComponentService;

open AddGameObjectComponentService;

open DisposeGameObjectComponentService;

open CloneGameObjectComponentService;

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: StateDataType.state) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(~expect={j|gameObject alive|j}, ~actual={j|not|j}),
        () => isAlive(gameObject, state.gameObjectRecord) |> assertTrue
      )
    )
  );

let addGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  let (basicCameraViewRecord, gameObjectRecord) =
    addBasicCameraViewComponent(
      gameObject,
      component,
      (state.basicCameraViewRecord, state.gameObjectRecord)
    );
  {...state, basicCameraViewRecord, gameObjectRecord}
};

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  let basicCameraViewRecord =
    [@bs] disposeBasicCameraViewComponent(gameObject, component, state.basicCameraViewRecord);
  {...state, basicCameraViewRecord}
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
  let (perspectiveCameraProjectionRecord, gameObjectRecord) =
    addPerspectiveCameraProjectionComponent(
      gameObject,
      component,
      (state.perspectiveCameraProjectionRecord, state.gameObjectRecord)
    );
  {...state, perspectiveCameraProjectionRecord, gameObjectRecord}
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  let perspectiveCameraProjectionRecord =
    [@bs]
    disposePerspectiveCameraProjectionComponent(
      gameObject,
      component,
      state.perspectiveCameraProjectionRecord
    );
  {...state, perspectiveCameraProjectionRecord}
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