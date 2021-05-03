

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ComponentMapService$Wonderjs from "../../../primitive/gameObject/ComponentMapService.js";
import * as RemoveGeometryMainService$Wonderjs from "../geometry/RemoveGeometryMainService.js";
import * as RemoveBasicMaterialMainService$Wonderjs from "../material/basic/RemoveBasicMaterialMainService.js";
import * as RemoveLightMaterialMainService$Wonderjs from "../material/light/RemoveLightMaterialMainService.js";

var _removeComponent = ComponentMapService$Wonderjs.removeComponent;

function removeGeometryComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* geometryMap */29] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* geometryMap */29]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return RemoveGeometryMainService$Wonderjs.handleRemoveComponent(uid, component, newrecord);
}

function batchRemoveGeometryComponent(state, geometryDataMap) {
  return RemoveGeometryMainService$Wonderjs.handleBatchRemoveComponent(geometryDataMap, state);
}

function removeBasicMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* basicMaterialMap */36] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* basicMaterialMap */36]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return RemoveBasicMaterialMainService$Wonderjs.handleRemoveComponent(uid, component, newrecord);
}

function batchRemoveBasicMaterialComponent(state, basicMaterialDataMap) {
  return RemoveBasicMaterialMainService$Wonderjs.handleBatchRemoveComponent(basicMaterialDataMap, state);
}

function removeLightMaterialComponent(uid, component, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* lightMaterialMap */37] = ComponentMapService$Wonderjs.removeComponent(uid, gameObjectRecord[/* lightMaterialMap */37]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return RemoveLightMaterialMainService$Wonderjs.handleRemoveComponent(uid, component, newrecord);
}

function batchRemoveLightMaterialComponent(state, lightMaterialDataMap) {
  return RemoveLightMaterialMainService$Wonderjs.handleBatchRemoveComponent(lightMaterialDataMap, state);
}

export {
  _removeComponent ,
  removeGeometryComponent ,
  batchRemoveGeometryComponent ,
  removeBasicMaterialComponent ,
  batchRemoveBasicMaterialComponent ,
  removeLightMaterialComponent ,
  batchRemoveLightMaterialComponent ,
  
}
/* ComponentMapService-Wonderjs Not a pure module */
