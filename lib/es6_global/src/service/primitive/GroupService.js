

import * as GameObjectsMapService$Wonderjs from "./GameObjectsMapService.js";

function isGroup(geometry, gameObjectsMap) {
  var match = GameObjectsMapService$Wonderjs.getGameObjects(geometry, gameObjectsMap);
  if (match !== undefined) {
    return match.length > 1;
  } else {
    return false;
  }
}

var removeGameObject = GameObjectsMapService$Wonderjs.removeGameObject;

export {
  isGroup ,
  removeGameObject ,
  
}
/* GameObjectsMapService-Wonderjs Not a pure module */
