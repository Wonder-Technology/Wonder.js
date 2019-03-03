

import * as GameObjectsMapService$Wonderjs from "./GameObjectsMapService.js";

function isGroup(component, gameObjectsMap) {
  var match = GameObjectsMapService$Wonderjs.getGameObjects(component, gameObjectsMap);
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

var removeGameObject = GameObjectsMapService$Wonderjs.removeGameObject;

var batchRemoveGameObjects = GameObjectsMapService$Wonderjs.batchRemoveGameObjects;

export {
  isGroup ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapService-Wonderjs Not a pure module */
