

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GroupService$Wonderjs from "../../../primitive/GroupService.js";

function isGroupGeometry(geometry, record) {
  return GroupService$Wonderjs.isGroup(geometry, record[/* gameObjectsMap */18]);
}

function removeGameObject(gameObject, geometry, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectsMap */18] = GroupService$Wonderjs.removeGameObject(gameObject, geometry, record[/* gameObjectsMap */18]);
  return newrecord;
}

function batchRemoveGameObjects(gameObjectArr, geometry, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectsMap */18] = GroupService$Wonderjs.batchRemoveGameObjects(gameObjectArr, geometry, record[/* gameObjectsMap */18]);
  return newrecord;
}

export {
  isGroupGeometry ,
  removeGameObject ,
  batchRemoveGameObjects ,
  
}
/* GroupService-Wonderjs Not a pure module */
