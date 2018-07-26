

import * as GameObjectMapService$Wonderjs from "../../../primitive/GameObjectMapService.js";

function getGameObject(transform, param) {
  var gameObjectMap = param[/* gameObjectMap */17];
  return GameObjectMapService$Wonderjs.getGameObject(transform, gameObjectMap);
}

function unsafeGetGameObject(transform, param) {
  var gameObjectMap = param[/* gameObjectMap */17];
  return GameObjectMapService$Wonderjs.unsafeGetGameObject(transform, gameObjectMap);
}

export {
  getGameObject ,
  unsafeGetGameObject ,
  
}
/* GameObjectMapService-Wonderjs Not a pure module */
