

import * as GameObjectsMapService$Wonderjs from "../../../../primitive/GameObjectsMapService.js";

function getGameObjects(material, param) {
  return GameObjectsMapService$Wonderjs.getGameObjects(material, param[/* gameObjectsMap */7]);
}

function unsafeGetGameObjects(material, param) {
  return GameObjectsMapService$Wonderjs.unsafeGetGameObjects(material, param[/* gameObjectsMap */7]);
}

export {
  getGameObjects ,
  unsafeGetGameObjects ,
  
}
/* GameObjectsMapService-Wonderjs Not a pure module */
