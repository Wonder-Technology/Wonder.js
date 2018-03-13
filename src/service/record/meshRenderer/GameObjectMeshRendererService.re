open MeshRendererType;

open IndexComponentService;

let getGameObject = (meshRenderer, {gameObjectMap}) =>
  GameObjectMapService.getGameObject(meshRenderer, gameObjectMap);

let unsafeGetGameObject = (meshRenderer, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(meshRenderer, gameObjectMap);