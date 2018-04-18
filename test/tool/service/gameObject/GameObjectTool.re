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
  DisposeGameObjectMainService.batchDispose(gameObjectArray, false, state);

let batchDisposeGameObjectKeepOrder =
    (gameObjectArray: array(gameObject), state: StateDataMainType.state) =>
  DisposeGameObjectMainService.batchDispose(gameObjectArray, true, state);

let disposeGameObjectBasicCameraViewComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeBasicCameraViewComponent(component, state);

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs]
  DisposeComponentGameObjectMainService.disposePerspectiveCameraProjectionComponent(
    component,
    state
  );

let disposeGameObjectTransformComponent =
    (gameObject: gameObject, component: component, isKeepOrder, state: StateDataMainType.state) =>
  [@bs]
  DisposeComponentGameObjectMainService.disposeTransformComponent(component, isKeepOrder, state);

let disposeGameObjectBoxGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeBoxGeometryComponent(component, state);

let disposeGameObjectCustomGeometryComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeCustomGeometryComponent(component, state);

let disposeGameObjectBasicMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeBasicMaterialComponent(component, state);

let disposeGameObjectLightMaterialComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeLightMaterialComponent(component, state);

let disposeGameObjectMeshRendererComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs]
  DisposeComponentGameObjectMainService.disposeMeshRendererComponent(gameObject, component, state);

let disposeGameObjectAmbientLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeAmbientLightComponent(component, state);

let disposeGameObjectDirectionLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeDirectionLightComponent(component, state);

let disposeGameObjectPointLightComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposePointLightComponent(component, state);

let disposeGameObjectSourceInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  DisposeComponentGameObjectMainService.disposeSourceInstanceComponent(
    component,
    DisposeGameObjectMainService.batchDispose,
    state
  );

let disposeGameObjectObjectInstanceComponent =
    (gameObject: gameObject, component: component, state: StateDataMainType.state) =>
  [@bs] DisposeComponentGameObjectMainService.disposeObjectInstanceComponent(component, state);