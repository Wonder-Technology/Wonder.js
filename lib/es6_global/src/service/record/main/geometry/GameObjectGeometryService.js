

import * as GameObjectsMapService$Wonderjs from "../../../primitive/GameObjectsMapService.js";

function getGameObjects(geometry, param) {
  return GameObjectsMapService$Wonderjs.getGameObjects(geometry, param[/* gameObjectsMap */18]);
}

function unsafeGetGameObjects(geometry, param) {
  return GameObjectsMapService$Wonderjs.unsafeGetGameObjects(geometry, param[/* gameObjectsMap */18]);
}

export {
  getGameObjects ,
  unsafeGetGameObjects ,
  
}
/* GameObjectsMapService-Wonderjs Not a pure module */
