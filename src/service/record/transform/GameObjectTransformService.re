open TransformType;

open ComponentSystem;

let getGameObject = (transform, {gameObjectMap}) =>
  ComponentSystem.getComponentGameObject(transform, gameObjectMap);

let unsafeGetGameObject = (transform, {gameObjectMap}) =>
  ComponentSystem.unsafeGetComponentGameObject(transform, gameObjectMap);