

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GameObjectsMapGroupService$Wonderjs from "../../../primitive/GameObjectsMapGroupService.js";

function isGroupGeometry(geometry, record) {
  return GameObjectsMapGroupService$Wonderjs.isGroup(geometry, record[/* gameObjectsMap */18]);
}

function removeGameObject(gameObject, geometry, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectsMap */18] = GameObjectsMapGroupService$Wonderjs.removeGameObject(gameObject, geometry, record[/* gameObjectsMap */18]);
  return newrecord;
}

function batchRemoveGameObjects(gameObjectArr, geometry, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectsMap */18] = GameObjectsMapGroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, geometry, record[/* gameObjectsMap */18]);
  return newrecord;
}

export {
  isGroupGeometry ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GameObjectsMapGroupService-Wonderjs Not a pure module */
