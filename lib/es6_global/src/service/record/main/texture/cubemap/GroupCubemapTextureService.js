

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GroupTextureService$Wonderjs from "../GroupTextureService.js";
import * as MaterialsMapService$Wonderjs from "../MaterialsMapService.js";

function addMaterial(materialData, texture, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* materialsMap */37] = GroupTextureService$Wonderjs.addMaterial(materialData, texture, record[/* materialsMap */37]);
  return newrecord;
}

function isGroupCubemapTexture(texture, record) {
  return GroupTextureService$Wonderjs.isGroup(texture, record[/* materialsMap */37]);
}

function removeMaterial(materialData, texture, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* materialsMap */37] = GroupTextureService$Wonderjs.removeMaterial(materialData, texture, record[/* materialsMap */37]);
  return newrecord;
}

function clearMaterial(texture, record) {
  var newrecord = Caml_array.caml_array_dup(record);
  newrecord[/* materialsMap */37] = GroupTextureService$Wonderjs.clearMaterial(texture, record[/* materialsMap */37]);
  return newrecord;
}

function getMaterialDataArr(texture, record) {
  return MaterialsMapService$Wonderjs.getMaterialDataArr(texture, record[/* materialsMap */37]);
}

export {
  addMaterial ,
  isGroupCubemapTexture ,
  removeMaterial ,
  clearMaterial ,
  getMaterialDataArr ,
  
}
/* GroupTextureService-Wonderjs Not a pure module */
