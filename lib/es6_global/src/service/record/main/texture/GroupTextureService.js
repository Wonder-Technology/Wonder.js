

import * as MaterialsMapService$Wonderjs from "./MaterialsMapService.js";

var addMaterial = MaterialsMapService$Wonderjs.addMaterial;

function isGroup(texture, materialsMap) {
  var match = MaterialsMapService$Wonderjs.getMaterialDataArr(texture, materialsMap);
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

var removeMaterial = MaterialsMapService$Wonderjs.removeMaterial;

var clearMaterial = MaterialsMapService$Wonderjs.clearMaterial;

export {
  addMaterial ,
  isGroup ,
  removeMaterial ,
  clearMaterial ,
  
}
/* MaterialsMapService-Wonderjs Not a pure module */
