open BasicCameraViewType;

open IndexComponentService;

let unsafeGetGameObject = (cameraView, {gameObjectMap}) =>
  GameObjectMapService.unsafeGetGameObject(cameraView, gameObjectMap);