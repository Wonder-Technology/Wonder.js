

import * as GameObjectMapService$Wonderjs from "../../../primitive/GameObjectMapService.js";

function getGameObject(script, param) {
  return GameObjectMapService$Wonderjs.getGameObject(script, param[/* gameObjectMap */3]);
}

function unsafeGetGameObject(script, param) {
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(script, param[/* gameObjectMap */3]);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
