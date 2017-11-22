open GameObjectType;

open GameObjectSystem;

open ComponentType;

let createGameObject = (state: StateDataType.state) => create(state);

let addGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  addTransformComponent(gameObject, component, state);

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  disposeTransformComponent(gameObject, component, state);

let getGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) =>
  Js.Option.getExn(getTransformComponent(gameObject, state));

let hasGameObjectTransformComponent = (gameObject: gameObject, state: StateDataType.state) =>
  hasTransformComponent(gameObject, state);

let addGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  addCameraControllerComponent(gameObject, component, state);

let disposeGameObjectCameraControllerComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  disposeCameraControllerComponent(gameObject, component, state);

let getGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) =>
  Js.Option.getExn(getCameraControllerComponent(gameObject, state));

let hasGameObjectCameraControllerComponent = (gameObject: gameObject, state: StateDataType.state) =>
  hasCameraControllerComponent(gameObject, state);

let addGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  addMaterialComponent(gameObject, component, state);

let disposeGameObjectMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  disposeMaterialComponent(gameObject, component, state);

let getGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) =>
  Js.Option.getExn(getMaterialComponent(gameObject, state));

let hasGameObjectMaterialComponent = (gameObject: gameObject, state: StateDataType.state) =>
  hasMaterialComponent(gameObject, state);

let addGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  addMeshRendererComponent(gameObject, component, state);

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  disposeMeshRendererComponent(gameObject, component, state);

let getGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) =>
  Js.Option.getExn(getMeshRendererComponent(gameObject, state));

let hasGameObjectMeshRendererComponent = (gameObject: gameObject, state: StateDataType.state) =>
  hasMeshRendererComponent(gameObject, state);

let addGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  addGeometryComponent(gameObject, component, state);

let disposeGameObjectGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataType.state) =>
  /* todo check alive */
  disposeGeometryComponent(
    gameObject,
    /* GeometryIndexUtils.getMappedIndex(
      Js.Int.toString(component),
      GeometryIndexUtils.getMappedIndexMap(state)
    ), */
    component,
    state
  );

let getGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) =>
  Js.Option.getExn(getGeometryComponent(gameObject, state));

let hasGameObjectGeometryComponent = (gameObject: gameObject, state: StateDataType.state) =>
  hasGeometryComponent(gameObject, state);

let isGameObjectAlive = (gameObject: gameObject, state: StateDataType.state) =>
  isAlive(gameObject, state);

let disposeGameObject = (gameObject: gameObject, state: StateDataType.state) =>
  dispose(gameObject, state);

let initGameObject = (gameObject: gameObject, state: StateDataType.state) =>
  initGameObject(gameObject, state);