// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as AddComponentService$Wonderjs from "../../../primitiive/component/AddComponentService.js";

function handleAddComponent(sourceInstance, gameObjectUid, record) {
  var newrecord = record.slice();
  newrecord[/* gameObjectMap */7] = AddComponentService$Wonderjs.addComponentToGameObjectMap(sourceInstance, gameObjectUid, record[/* gameObjectMap */7]);
  return newrecord;
}

export {
  handleAddComponent ,
  
}
/* No side effect */