open GameObjectType;

open GameObjectSystem;

open ComponentType;

open Contract;

let createGameObject = (state: StateDataType.state) => create(state);

let _checkGameObjectShouldAlive = (gameObject: gameObject, state: StateDataType.state) =>
  Contract.(
    Contract.Operators.(
      test("gameObject should alive", () => isAlive(gameObject, state) |> assertTrue)
    )
  );

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  addTransformComponent(gameObject, component, state)
};

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  disposeTransformComponent(gameObject, component, state)
};

let getGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  Js.Option.getExn(getTransformComponent(gameObject, state))
};

let hasGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  hasTransformComponent(gameObject, state)
};

let addGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  addCameraControllerComponent(gameObject, component, state)
};

let disposeGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  disposeCameraControllerComponent(gameObject, component, state)
};

let getGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  Js.Option.getExn(getCameraControllerComponent(gameObject, state))
};

let hasGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  hasCameraControllerComponent(gameObject, state)
};

let addGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  addMaterialComponent(gameObject, component, state)
};

let disposeGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  disposeMaterialComponent(gameObject, component, state)
};

let getGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  Js.Option.getExn(getMaterialComponent(gameObject, state))
};

let hasGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  hasMaterialComponent(gameObject, state)
};

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  addMeshRendererComponent(gameObject, component, state)
};

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  disposeMeshRendererComponent(gameObject, component, state)
};

let getGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  Js.Option.getExn(getMeshRendererComponent(gameObject, state))
};

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  hasMeshRendererComponent(gameObject, state)
};

let addGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  addGeometryComponent(gameObject, component, state)
};

let disposeGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  disposeGeometryComponent(gameObject, component, state)
};

let getGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  Js.Option.getExn(getGeometryComponent(gameObject, state))
};

let hasGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  hasGeometryComponent(gameObject, state)
};

let isGameObjectAlive = (gameObject: gameObject, state: StateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  dispose(gameObject, state)
};

let initGameObject = (gameObject: gameObject, state: StateDataType.state) => {
  requireCheck(() => Contract.Operators.(_checkGameObjectShouldAlive(gameObject, state)));
  initGameObject(gameObject, state)
};

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        gameObjectArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs] ((gameObject) => _checkGameObjectShouldAlive(gameObject, state))
           )
      )
  );
  batchDispose(gameObjectArray, state)
};

let cloneGameObject = (gameObject: gameObject, count: int, state: StateDataType.state) =>
  clone(gameObject, count, state);