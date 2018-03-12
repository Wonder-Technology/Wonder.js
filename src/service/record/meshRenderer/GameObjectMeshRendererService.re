open MeshRendererType;

open ComponentSystem;

let getGameObject = (meshRenderer, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(meshRenderer, gameObjectMap);

let unsafeGetGameObject = (meshRenderer, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(meshRenderer, gameObjectMap);