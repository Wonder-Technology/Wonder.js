open GameObjectType;

open GameObjectAdmin;

open ComponentType;

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
  disposeTransformComponent(gameObject, component, state)
};

let getGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  Js.Option.getExn(getTransformComponent(gameObject, state))
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasTransformComponent(gameObject, state)
};

let addGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addCameraControllerComponent(gameObject, component, state)
};

let disposeGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeCameraControllerComponent(gameObject, component, state)
};

let getGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  Js.Option.getExn(getCameraControllerComponent(gameObject, state))
};

let hasGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasCameraControllerComponent(gameObject, state)
};

let addGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addMaterialComponent(gameObject, component, state)
};

let disposeGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeMaterialComponent(gameObject, component, state)
};

let getGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  Js.Option.getExn(getMaterialComponent(gameObject, state))
};

let hasGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasMaterialComponent(gameObject, state)
};

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addMeshRendererComponent(gameObject, component, state)
};

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeMeshRendererComponent(gameObject, component, state)
};

let getGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  Js.Option.getExn(getMeshRendererComponent(gameObject, state))
};

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasMeshRendererComponent(gameObject, state)
};

let addGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addGeometryComponent(gameObject, component, state)
};

let disposeGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeGeometryComponent(gameObject, component, state)
};

let getGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  Js.Option.getExn(getGeometryComponent(gameObject, state))
};

let hasGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasGeometryComponent(gameObject, state)
};

let addGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addSourceInstanceComponent(gameObject, component, state)
};

let getGameObjectSourceInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  getSourceInstanceComponent(gameObject, state)
};

let hasGameObjectSourceInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  hasSourceInstanceComponent(gameObject, state)
};

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeSourceInstanceComponent(gameObject, component, batchDispose, state)
};

let addGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  addObjectInstanceComponent(gameObject, component, state)
};

let getGameObjectObjectInstanceComponent = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  getObjectInstanceComponent(gameObject, state)
};

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  disposeObjectInstanceComponent(gameObject, component, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: StateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  dispose(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => WonderLog.(Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))),
    StateData.stateData.isDebug
  );
  initGameObject(gameObject, state)
};

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject =
    (gameObject: gameObject, count: int, isShareMaterial: Js.boolean, state: StateDataType.state) =>
  clone(gameObject, count, Js.to_bool(isShareMaterial), state);