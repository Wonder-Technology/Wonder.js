open PerspectiveCameraProjectionType;

let getGameObject = (cameraProjection, {gameObjectMap}) =>
  ComponentSystem.getComponentGameObject(cameraProjection, gameObjectMap);

let unsafeGetGameObject = (cameraProjection, {gameObjectMap}) =>
  ComponentSystem.unsafeGetComponentGameObject(cameraProjection, gameObjectMap);