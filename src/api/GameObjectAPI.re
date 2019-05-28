open StateDataMainType;

open GameObjectType;

open ComponentType;

open DisposeComponentGameObjectMainService;

open GetComponentGameObjectService;

open HasComponentGameObjectService;

open CloneComponentGameObjectMainService;

open AddComponentGameObjectMainService;

open DisposeGameObjectMainService;

open CloneGameObjectMainService;

open CreateGameObjectMainService;

open AliveGameObjectMainService;

let createGameObject = (state: StateDataMainType.state) => create(state);

let _checkGameObjectShouldAlive =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) =>
  WonderLog.(
    Contract.(
      test(
        Log.buildAssertMessage(
          ~expect={j|gameObject alive|j},
          ~actual={j|not|j},
        ),
        () =>
        isAlive(gameObject, state) |> assertTrue
      )
    )
  );

let addGameObjectScriptComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addScriptComponent(gameObject, component, state);
};

let disposeGameObjectScriptComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeScriptComponent(. gameObject, component, state);
};

let unsafeGetGameObjectScriptComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetScriptComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectScriptComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasScriptComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectBasicCameraViewComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addBasicCameraViewComponent(gameObject, component, state);
};

let disposeGameObjectBasicCameraViewComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeBasicCameraViewComponent(. gameObject, component, state);
};

let unsafeGetGameObjectBasicCameraViewComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetBasicCameraViewComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectBasicCameraViewComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasBasicCameraViewComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addPerspectiveCameraProjectionComponent(gameObject, component, state);
};

let disposeGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposePerspectiveCameraProjectionComponent(.
    gameObject,
    component,
    state,
  );
};

let unsafeGetGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetPerspectiveCameraProjectionComponent(
    gameObject,
    state.gameObjectRecord,
  );
};

let hasGameObjectPerspectiveCameraProjectionComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasPerspectiveCameraProjectionComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectFlyCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addFlyCameraControllerComponent(gameObject, component, state);
};

let disposeGameObjectFlyCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeFlyCameraControllerComponent(. gameObject, component, state);
};

let unsafeGetGameObjectFlyCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetFlyCameraControllerComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectFlyCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasFlyCameraControllerComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectArcballCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addArcballCameraControllerComponent(gameObject, component, state);
};

let disposeGameObjectArcballCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeArcballCameraControllerComponent(.
    gameObject,
    component,
    state,
  );
};

let unsafeGetGameObjectArcballCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetArcballCameraControllerComponent(
    gameObject,
    state.gameObjectRecord,
  );
};

let hasGameObjectArcballCameraControllerComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasArcballCameraControllerComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectTransformComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addTransformComponent(gameObject, component, state);
};

let disposeGameObjectTransformComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      isKeepOrder,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  isKeepOrder ?
    deferDisposeTransformComponentForKeepOrder(.
      gameObject,
      component,
      state,
    ) :
    deferDisposeTransformComponent(. gameObject, component, state);
};

let unsafeGetGameObjectTransformComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetTransformComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectTransformComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasTransformComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectGeometryComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addGeometryComponent(gameObject, component, state);
};

let disposeGameObjectGeometryComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeGeometryComponent(. gameObject, component, state);
};

let removeGameObjectGeometryComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  RemoveComponentGameObjectMainService.removeGeometryComponent(
    gameObject,
    component,
    state,
  );
};

let removeGameObjectBasicMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  RemoveComponentGameObjectMainService.removeBasicMaterialComponent(
    gameObject,
    component,
    state,
  );
};

let removeGameObjectLightMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  RemoveComponentGameObjectMainService.removeLightMaterialComponent(
    gameObject,
    component,
    state,
  );
};

let unsafeGetGameObjectGeometryComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGeometryComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectGeometryComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasGeometryComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectBasicMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addBasicMaterialComponent(gameObject, component, state);
};

let disposeGameObjectBasicMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeBasicMaterialComponent(. gameObject, component, state);
};

let unsafeGetGameObjectBasicMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetBasicMaterialComponent(. gameObject, state.gameObjectRecord);
};

let hasGameObjectBasicMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasBasicMaterialComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectLightMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addLightMaterialComponent(gameObject, component, state);
};

let disposeGameObjectLightMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeLightMaterialComponent(. gameObject, component, state);
};

let unsafeGetGameObjectLightMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetLightMaterialComponent(. gameObject, state.gameObjectRecord);
};

let hasGameObjectLightMaterialComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasLightMaterialComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectMeshRendererComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addMeshRendererComponent(gameObject, component, state);
};

let disposeGameObjectMeshRendererComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeMeshRendererComponent(. gameObject, component, state);
};

let unsafeGetGameObjectMeshRendererComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetMeshRendererComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectMeshRendererComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasMeshRendererComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectDirectionLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addDirectionLightComponent(gameObject, component, state);
};

let disposeGameObjectDirectionLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeDirectionLightComponent(. gameObject, component, state);
};

let unsafeGetGameObjectDirectionLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetDirectionLightComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectDirectionLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasDirectionLightComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectPointLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addPointLightComponent(gameObject, component, state);
};

let disposeGameObjectPointLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposePointLightComponent(. gameObject, component, state);
};

let unsafeGetGameObjectPointLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetPointLightComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectPointLightComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasPointLightComponent(gameObject, state.gameObjectRecord);
};

let addGameObjectSourceInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addSourceInstanceComponent(gameObject, component, state);
};

let unsafeGetGameObjectSourceInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetSourceInstanceComponent(gameObject, state.gameObjectRecord);
};

let hasGameObjectSourceInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  hasSourceInstanceComponent(gameObject, state.gameObjectRecord);
};

let disposeGameObjectSourceInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeSourceInstanceComponent(. gameObject, component, state);
};

let addGameObjectObjectInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  addObjectInstanceComponent(gameObject, component, state);
};

let unsafeGetGameObjectObjectInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetObjectInstanceComponent(gameObject, state.gameObjectRecord);
};

let disposeGameObjectObjectInstanceComponent =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      component: component,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeObjectInstanceComponent(. gameObject, component, state);
};

let isGameObjectAlive =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) =>
  isAlive(gameObject, state);

let disposeGameObject =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDispose(gameObject, state);
};

let disposeGameObjectKeepOrder =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeKeepOrder(gameObject, state);
};

let disposeGameObjectKeepOrderRemoveGeometry =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeKeepOrderRemoveGeometry(gameObject, state);
};

let disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeKeepOrderRemoveGeometryRemoveMaterial(gameObject, state);
};

let disposeGameObjectDisposeGeometryRemoveMaterial =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferDisposeDisposeGeometryRemoveMaterial(gameObject, state);
};

let initGameObject =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  InitGameObjectMainService.initGameObject(gameObject, state);
};

let batchDisposeGameObject =
    (
      gameObjectArray: array(GameObjectPrimitiveType.gameObject),
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArrayService.forEach((. gameObject) =>
                 _checkGameObjectShouldAlive(gameObject, state)
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferBatchDispose(gameObjectArray, state);
};

let batchDisposeGameObjectKeepOrder =
    (
      gameObjectArray: array(GameObjectPrimitiveType.gameObject),
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            gameObjectArray
            |> WonderCommonlib.ArrayService.forEach((. gameObject) =>
                 _checkGameObjectShouldAlive(gameObject, state)
               )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  deferBatchDisposeKeepOrder(gameObjectArray, state);
};

let cloneGameObject =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      count: int,
      isShareMaterial: bool,
      state: StateDataMainType.state,
    ) =>
  clone(gameObject, count, isShareMaterial, state);

let getGameObjectName =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    )
    : option(string) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGameObjectMainService.getName(gameObject, state);
};

let unsafeGetGameObjectName =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGameObjectMainService.unsafeGetName(gameObject, state);
};

let setGameObjectName =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      name,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  NameGameObjectMainService.setName(. gameObject, name, state);
};

let unsafeGetGameObjectIsRoot =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IsRootGameObjectMainService.unsafeGetIsRoot(gameObject, state);
};

let setGameObjectIsRoot =
    (
      gameObject: GameObjectPrimitiveType.gameObject,
      isRoot,
      state: StateDataMainType.state,
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  IsRootGameObjectMainService.setIsRoot(. gameObject, isRoot, state);
};

let getAllChildrenTransform = (gameObject, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  AllGameObjectMainService.getAllChildrenTransform(gameObject, state);
};

let getAllGameObjects = (gameObject, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  AllGameObjectMainService.getAllGameObjects(gameObject, state);
};

let getAllDirectionLightComponentsOfGameObject = AllGameObjectMainService.getAllDirectionLightComponentsOfGameObject;

let getAllPointLightComponentsOfGameObject = AllGameObjectMainService.getAllPointLightComponentsOfGameObject;

let getAllPointLightComponents = GetComponentGameObjectMainService.getAllPointLightComponents;

let getAllGeometryComponents = GetComponentGameObjectMainService.getAllGeometryComponents;

let getAllArcballCameraControllerComponents = GetComponentGameObjectMainService.getAllArcballCameraControllerComponents;

let getAllBasicCameraViewComponents = GetComponentGameObjectMainService.getAllBasicCameraViewComponents;

let getAllPerspectiveCameraProjectionComponents = GetComponentGameObjectMainService.getAllPerspectiveCameraProjectionComponents;

let getAllBasicMaterialComponents = GetComponentGameObjectMainService.getAllBasicMaterialComponents;

let getAllLightMaterialComponents = GetComponentGameObjectMainService.getAllLightMaterialComponents;

let getAllDirectionLightComponents = GetComponentGameObjectMainService.getAllDirectionLightComponents;

let getAllPointLightComponents = GetComponentGameObjectMainService.getAllPointLightComponents;

let unsafeGetGameObjectIsActive = (gameObject, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  GetIsActiveGameObjectMainService.unsafeGetIsActive(gameObject, state);
};

let setGameObjectIsActive = (gameObject, isScriptActive, state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(_checkGameObjectShouldAlive(gameObject, state)))
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  SetIsActiveGameObjectMainService.setIsActive(
    gameObject,
    isScriptActive,
    state,
  );
};