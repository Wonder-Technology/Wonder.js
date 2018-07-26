

import * as GameObjectMapService$Wonderjs from "../../../primitive/GameObjectMapService.js";

function getGameObject(cameraProjection, param) {
  return GameObjectMapService$Wonderjs.getGameObject(cameraProjection, param[/* gameObjectMap */7]);
}

function unsafeGetGameObject(cameraProjection, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(cameraProjection, param[/* gameObjectMap */7]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
