

import * as GameObjectMapService$Wonderjs from "../../../../primitive/GameObjectMapService.js";

function getGameObject(cameraController, param) {
  return GameObjectMapService$Wonderjs.getGameObject(cameraController, param[/* gameObjectMap */12]);
}

function unsafeGetGameObject(cameraController, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(cameraController, param[/* gameObjectMap */12]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
