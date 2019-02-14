

import * as GameObjectMapService$Wonderjs from "../../../../primitive/GameObjectMapService.js";

function getGameObject(objectInstance, param) {
  return GameObjectMapService$Wonderjs.getGameObject(objectInstance, param[/* gameObjectMap */3]);
}

function unsafeGetGameObject(objectInstance, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(objectInstance, param[/* gameObjectMap */3]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
