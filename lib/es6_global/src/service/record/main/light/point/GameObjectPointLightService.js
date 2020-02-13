

import * as GameObjectMapService$Wonderjs from "../../../../primitive/GameObjectMapService.js";

function getGameObject(light, param) {
  return GameObjectMapService$Wonderjs.getGameObject(light, param[/* gameObjectMap */10]);
}

function unsafeGetGameObject(light, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(light, param[/* gameObjectMap */10]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
