

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AddComponentService$Wonderjs from "../../../primitive/component/AddComponentService.js";

function handleAddComponent(geometry, gameObjectUid, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* gameObjectsMap */18] = AddComponentService$Wonderjs.addSharableComponentToGameObjectsMap(geometry, gameObjectUid, record[/* gameObjectsMap */18]);
  return newrecord;
}

export {
  handleAddComponent ,
  
}
/* AddComponentService-Wonderjs Not a pure module */
