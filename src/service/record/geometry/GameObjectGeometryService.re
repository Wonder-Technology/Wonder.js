open BoxGeometryType;

open ComponentSystem;

let getGameObject = (geometry, {gameObjectMap}) =>
  ComponentSystem.getComponentGameObject(geometry, gameObjectMap);

let unsafeGetGameObject = (geometry, {gameObjectMap}) =>
  ComponentSystem.unsafeGetComponentGameObject(geometry, gameObjectMap);
