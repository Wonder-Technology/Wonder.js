open GameObjectType;

open GameObjectSystem;

open ComponentType;

let createGameObject (state: StateDataType.state) => create state;

let addGameObjectTransformComponent
    (gameObject: gameObject)
    (component: component)
    (state: StateDataType.state) =>
  /* todo check alive */
  addTransformComponent gameObject component state;

let getGameObjectTransformComponent (gameObject: gameObject) (state: StateDataType.state) =>
  Js.Option.getExn (getTransformComponent gameObject state);

let hasGameObjectTransformComponent (gameObject: gameObject) (state: StateDataType.state) =>
  hasTransformComponent gameObject state;

let addGameObjectCameraControllerComponent
    (gameObject: gameObject)
    (component: component)
    (state: StateDataType.state) =>
  /* todo check alive */
  addCameraControllerComponent gameObject component state;

let getGameObjectCameraControllerComponent (gameObject: gameObject) (state: StateDataType.state) =>
  Js.Option.getExn (getCameraControllerComponent gameObject state);

let hasGameObjectCameraControllerComponent (gameObject: gameObject) (state: StateDataType.state) =>
  hasCameraControllerComponent gameObject state;