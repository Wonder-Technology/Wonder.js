

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(transform, gameObjectUid, record) {
  var gameObjectMap = record[/* gameObjectMap */17];
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectMap */17] = AddComponentService$Wonderjs.addComponentToGameObjectMap(transform, gameObjectUid, gameObjectMap);
  return newrecord;
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
