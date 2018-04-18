open GameObjectType;

open ComponentType;

let createGameObject = (state: StateDataMainType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  (state, gameObject, GameObjectAPI.unsafeGetGameObjectTransformComponent(gameObject, state))
};

let getGameObjectRecord = (state: StateDataMainType.state) => state.gameObjectRecord;

let initGameObject = (gameObject, state: StateDataMainType.state) =>
  state |> AllMaterialTool.prepareForInit |> GameObjectAPI.initGameObject(gameObject);

let disposeGameObject = (gameObject: gameObject, state: StateDataMainType.state) =>
  DisposeGameObjectMainService.dispose(gameObject, state);

let disposeGameObjectKeepOrder = (gameObject: gameObject, state: StateDataMainType.state) =>
  DisposeGameObjectMainService.disposeKeepOrder(gameObject, state);

let batchDisposeGameObject = (gameObjectArray: array(gameObject), state: StateDataMainType.state) =>
  DisposeGameObjectMainService.batchDispose(gameObjectArray, state);

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeBasicCameraViewComponent(component, state);